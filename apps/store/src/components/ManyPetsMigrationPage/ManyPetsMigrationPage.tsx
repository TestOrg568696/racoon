import Head from 'next/head'
import { FormEventHandler, useCallback } from 'react'
import { Button, Heading, Space } from 'ui'
import {
  useManyPetsFillCartMutation,
  useManyPetsMigrationOffersQuery,
} from '@/services/apollo/generated'
import { BankIdState } from '@/services/bankId/bankId.types'
import { useBankIdContext } from '@/services/bankId/BankIdContext'
import { ShopSession } from '@/services/shopSession/ShopSession.types'
import { useShopSession } from '@/services/shopSession/ShopSessionContext'

export const ManyPetsMigrationPage = () => {
  const { shopSession } = useShopSession()
  if (!shopSession) {
    throw new Error('Must have shopSession at this point')
  }

  const queryResult = useManyPetsMigrationOffersQuery({
    variables: { shopSessionId: shopSession.id },
  })

  const offers = queryResult.data?.petMigrationOffers
  const offerIds = offers?.map((offer) => offer.id) ?? []

  const { handleSubmitSign, loading } = useSignMigration(shopSession, offerIds)

  return (
    <>
      <Head>
        <title>TODO: Pet migration page</title>
        <meta name="robots" content="none" />
      </Head>
      <div>
        <Heading variant="serif.40" as="h1">
          Pet Migration page 🐈‍ 🐩
        </Heading>
        <Space>
          <Heading as="h2">Your pets</Heading>
          <div style={{ maxHeight: '80vh', overflow: 'auto' }}>
            {queryResult.loading && 'Loading...'}

            {offers?.map((offer) => (
              <pre
                key={offer.id}
                style={{
                  whiteSpace: 'pre',
                  fontFamily: 'monospace',
                  margin: '1rem 0',
                  borderTop: 'solid 1px gray',
                }}
              >
                {JSON.stringify(offer, null, 2)}
              </pre>
            ))}
          </div>
        </Space>

        {offerIds.length > 0 && (
          <form onSubmit={handleSubmitSign}>
            <Space>
              <Button type="submit" loading={loading}>
                SIGN IT!
              </Button>
            </Space>
          </form>
        )}
      </div>
    </>
  )
}

// TODO:
// - Extract and handle errors
const useSignMigration = (
  shopSession: Pick<ShopSession, 'id' | 'customer' | 'cart'>,
  offerIds: Array<string>,
) => {
  const { currentOperation, startCheckoutSign } = useBankIdContext()

  const [fillCart, fillCartResult] = useManyPetsFillCartMutation()

  const handleSubmitSign: FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault()

      if (!shopSession.customer || !shopSession.customer.ssn)
        throw new Error('Must have customer data and ssn in it')

      const shopSessionId = shopSession.id

      if (shopSession.cart.entries.length === 0) {
        console.debug('Filling cart')
        await fillCart({ variables: { shopSessionId, offerIds } })
      } else {
        if (offerIds.length === shopSession.cart.entries.length) {
          const cartOfferIds = new Set(shopSession.cart.entries.map((entry) => entry.id))
          if (offerIds.every((id) => cartOfferIds.has(id))) {
            console.debug('Cart already filled with expected offers')
          } else {
            throw new Error(
              `Cart has unexpected items in it. cartOfferIds=${Array.from(
                cartOfferIds.values(),
              )}, migration offerIds=${offerIds}`,
            )
          }
        }
      }

      const { authenticationStatus: customerAuthenticationStatus, ssn } = shopSession.customer
      startCheckoutSign({
        customerAuthenticationStatus,
        shopSessionId,
        ssn,
        onSuccess() {
          window.alert('Sign success, time to implement next steps!')
        },
      })
    },
    [shopSession, startCheckoutSign, fillCart, offerIds],
  )

  const signLoading = [BankIdState.Starting, BankIdState.Pending, BankIdState.Success].includes(
    currentOperation?.state as BankIdState,
  )

  return { handleSubmitSign, loading: fillCartResult.loading || signLoading }
}