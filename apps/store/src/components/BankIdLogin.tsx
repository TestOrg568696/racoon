// TODO: Localize texts
import { datadogLogs } from '@datadog/browser-logs'
import { FormEventHandler, useState } from 'react'
import { Button, Text } from 'ui'
import { useShopSessionAuthenticateMutation } from '@/services/apollo/generated'
import { loginMemberSeBankId } from '@/services/authApi/login'
import { exchangeAuthorizationCode } from '@/services/authApi/oauth'
import { saveAccessToken } from '@/services/authApi/persist'

type Props = {
  shopSessionId: string
  ssn: string
  onCompleted: () => void
}

export const BankIdLogin = (props: Props) => {
  const [state, setState] = useState<'IDLE' | 'PROGRESS' | 'ERROR'>('IDLE')
  const { shopSessionId } = props
  const [authenticateShopSession] = useShopSessionAuthenticateMutation({
    variables: { shopSessionId },
  })
  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault()
    setState('PROGRESS')
    try {
      const authorizationCode = await loginMemberSeBankId(props.ssn)
      const accessToken = await exchangeAuthorizationCode(authorizationCode)
      saveAccessToken(accessToken)
      await authenticateShopSession()
      props.onCompleted()
    } catch (error) {
      datadogLogs.logger.warn('Failed to authenticate', { error })
      setState('ERROR')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit" loading={state === 'PROGRESS'}>
        BankID Login
      </Button>
      {state === 'PROGRESS' && <Text>Pleas open BankID app now</Text>}
      {state === 'ERROR' && <Text>Something went wrong</Text>}
    </form>
  )
}