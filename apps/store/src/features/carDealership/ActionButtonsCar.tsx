import { datadogRum } from '@datadog/browser-rum'
import styled from '@emotion/styled'
import { useState } from 'react'
import { theme } from 'ui'
import { ActionButton } from '@/components/ProductItem/ProductItem'
import { type ProductOfferFragment } from '@/services/apollo/generated'
import { PriceIntent } from '@/services/priceIntent/priceIntent.types'
import { ActionStateEdit } from './ActionStateEdit'
import { RemoveCarOfferActionButton } from './RemoveCarOfferActionButton'
import { useEditAndConfirm } from './useEditAndConfirm'

type State = { type: 'IDLE' } | { type: 'EDITING' } | { type: 'SUBMITTING'; tierLevel?: string }

const STATE: Record<Exclude<State['type'], 'SUBMITTING'>, State> = {
  IDLE: { type: 'IDLE' },
  EDITING: { type: 'EDITING' },
}

type Offer = Pick<ProductOfferFragment, 'id'> & {
  variant: Pick<ProductOfferFragment['variant'], 'typeOfContract' | 'displayName'>
}

type Props = {
  priceIntent: Pick<PriceIntent, 'id' | 'data'> & { offers: Array<Offer> }
  offer: Offer

  onUpdate: (tierLevel: string) => void
  onRemove: () => void
}

export const ActionButtonsCar = (props: Props) => {
  const [state, setState] = useState<State>(STATE.IDLE)

  const [editAndConfirm, loading] = useEditAndConfirm({
    priceIntentId: props.priceIntent.id,

    onCompleted() {
      if (state.type === 'SUBMITTING' && state.tierLevel) {
        props.onUpdate(state.tierLevel)
      }

      setState(STATE.IDLE)
    },
  })

  const handleClickEdit = () => {
    datadogRum.addAction('Offer Car Edit')
    setState(STATE.EDITING)
  }

  const handleClickRemove = () => {
    datadogRum.addAction('Offer Car Remove')
    props.onRemove()
  }

  if (state.type === 'EDITING' || state.type === 'SUBMITTING') {
    const handleCancel = () => setState(STATE.IDLE)

    const handleSave = (tierLevel: string, data: Record<string, unknown>) => {
      setState({
        type: 'SUBMITTING',
        tierLevel: tierLevel !== props.offer.variant.typeOfContract ? tierLevel : undefined,
      })

      editAndConfirm(data)
    }

    const options = props.priceIntent.offers.map((offer) => ({
      name: offer.variant.displayName,
      value: offer.id,
    }))

    return (
      <ActionStateEdit
        options={options}
        onSave={handleSave}
        onCancel={handleCancel}
        loading={loading}
        data={props.priceIntent.data}
      />
    )
  }

  return (
    <ButtonWrapper>
      <ActionButton onClick={handleClickEdit}>Edit</ActionButton>
      <RemoveCarOfferActionButton onConfirm={handleClickRemove} />
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div({
  display: 'grid',
  gridAutoFlow: 'column',
  gap: theme.space.xs,
})
