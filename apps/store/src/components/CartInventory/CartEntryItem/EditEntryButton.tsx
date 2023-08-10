import styled from '@emotion/styled'
import { useTranslation } from 'next-i18next'
import Balancer from 'react-wrap-balancer'
import { Button, Text } from 'ui'
import * as FullscreenDialog from '@/components/FullscreenDialog/FullscreenDialog'
import { ActionButton } from '@/components/ProductItem/ProductItem'

type Props = {
  onConfirm: () => void
  loading: boolean
}

export const EditEntryButton = ({ onConfirm, loading }: Props) => {
  const { t } = useTranslation('cart')

  return (
    <FullscreenDialog.Root>
      <FullscreenDialog.Trigger asChild={true}>
        <ActionButton>{t('CART_ENTRY_EDIT_BUTTON')}</ActionButton>
      </FullscreenDialog.Trigger>

      <FullscreenDialog.Modal
        center={true}
        Footer={
          <>
            <Button onClick={onConfirm} loading={loading}>
              {t('EDIT_CONFIRMATION_MODAL_CONTINUE')}
            </Button>
            <FullscreenDialog.Close asChild={true}>
              <Button type="button" variant="ghost">
                {t('EDIT_CONFIRMATION_MODAL_CANCEL')}
              </Button>
            </FullscreenDialog.Close>
          </>
        }
      >
        <CappedText size={{ _: 'md', lg: 'xl' }} align="center">
          <Balancer>{t('EDIT_CONFIRMATION_MODAL_PROMPT')}</Balancer>
        </CappedText>
      </FullscreenDialog.Modal>
    </FullscreenDialog.Root>
  )
}

const CappedText = styled(Text)({ maxWidth: '42rem' })
