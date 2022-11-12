import styled from '@emotion/styled'
import { Pillow } from '@/components/Pillow/Pillow'
import { ProductOfferFragment } from '@/services/apollo/generated'
import { useCurrencyFormatter } from '@/utils/useCurrencyFormatter'
import * as InventoryItem from './InventoryItem'

type Props = {
  offer: ProductOfferFragment
  onRemove?: (offer: ProductOfferFragment) => void
}

export const OfferInventoryItem = ({ offer, onRemove }: Props) => {
  const currencyFormatter = useCurrencyFormatter(offer.price.currencyCode)

  return (
    <InventoryItem.Root>
      <InventoryItem.Left>
        <Pillow size="small" fromColor="blue" toColor="green" />
      </InventoryItem.Left>
      <InventoryItem.Main>
        <InventoryItem.MainLeft>
          <p>{offer.variant.displayName}</p>
        </InventoryItem.MainLeft>
        <InventoryItem.MainRight>
          {currencyFormatter.format(offer.price.amount)}/mån
        </InventoryItem.MainRight>
        {onRemove && (
          <InventoryItem.MainBottom>
            <ButtonLink onClick={() => onRemove(offer)}>Ta bort</ButtonLink>
          </InventoryItem.MainBottom>
        )}
      </InventoryItem.Main>
    </InventoryItem.Root>
  )
}

const ButtonLink = styled.button(({ theme }) => ({
  fontSize: theme.fontSizes[1],
  textDecoration: 'underline',
  cursor: 'pointer',
}))