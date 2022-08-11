import { ApolloClient } from '@apollo/client'
import {
  ShopSessionCreateMutationVariables,
  ShopSessionCreateDocument,
  ShopSessionDocument,
  ShopSessionQuery,
  ShopSessionCreateMutation,
  ShopSessionQueryVariables,
} from '@/services/apollo/generated'
import { SimplePersister } from '@/services/persister/Persister.types'

export class ShopSessionService {
  constructor(
    private readonly persister: SimplePersister,
    private readonly apolloClient: ApolloClient<unknown>,
  ) {}

  public async getOrCreate(params: ShopSessionCreateMutationVariables) {
    const existingShopSession = await this.fetch()

    if (existingShopSession) return existingShopSession

    return await this.create(params)
  }

  public async fetch() {
    const shopSessionId = this.persister.fetch()
    if (!shopSessionId) return null

    try {
      const { data } = await this.apolloClient.query<ShopSessionQuery, ShopSessionQueryVariables>({
        query: ShopSessionDocument,
        variables: { shopSessionId },
      })

      return data.shopSession
    } catch (error) {
      console.log('ShopSession not found: ', shopSessionId)
      return null
    }
  }

  private async create(variables: ShopSessionCreateMutationVariables) {
    const result = await this.apolloClient.mutate<
      ShopSessionCreateMutation,
      ShopSessionCreateMutationVariables
    >({
      mutation: ShopSessionCreateDocument,
      variables,
    })

    const shopSession = result.data?.shopSessionCreate

    if (!shopSession) throw new Error('Unable to create ShopSession')

    this.persister.save(shopSession.id)

    return shopSession
  }
}
