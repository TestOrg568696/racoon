import { datadogLogs } from '@datadog/browser-logs'
import { useMemo } from 'react'
import {
  PriceIntentFragmentFragment,
  usePriceIntentConfirmMutation,
} from '@/services/apollo/generated'
import { trackOffer } from '@/services/gtm'
import {
  prefillData,
  setupForm,
  updateFormState,
} from '@/services/PriceCalculator/PriceCalculator.helpers'
import { Form, Template } from '@/services/PriceCalculator/PriceCalculator.types'
import { PriceIntent } from '@/services/priceIntent/priceIntent.types'
import { useShopSession } from '@/services/shopSession/ShopSessionContext'
import { AutomaticField } from './AutomaticField'
import { FormGrid } from './FormGrid'
import { PriceCalculatorAccordion } from './PriceCalculatorAccordion'
import { PriceCalculatorSection } from './PriceCalculatorSection'
import { useHandleSubmitPriceCalculator } from './useHandleSubmitPriceCalculator'

type Props = {
  priceIntent: PriceIntent
  priceTemplate: Template
  onSuccess: (priceIntent: PriceIntentFragmentFragment) => void
  onUpdated: (priceIntent: PriceIntentFragmentFragment) => void
  loading: boolean
}

export const PriceCalculator = ({
  priceTemplate,
  priceIntent,
  onUpdated,
  onSuccess,
  loading,
}: Props) => {
  const form = useMemo(() => {
    return setupForm(priceTemplate, priceIntent.data, priceIntent.suggestedData)
  }, [priceTemplate, priceIntent])

  const { shopSession } = useShopSession()
  const [confirmPriceIntent, { loading: loadingConfirm }] = usePriceIntentConfirmMutation({
    variables: { priceIntentId: priceIntent.id },
    onCompleted(data) {
      const updatedPriceIntent = data.priceIntentConfirm.priceIntent
      if (updatedPriceIntent) {
        // FIXME: pick offer for specific product or track all offers
        const firstOffer = updatedPriceIntent.offers[0]
        trackOffer({
          shopSessionId: shopSession!.id,
          contractType: firstOffer.variant.typeOfContract,
          amount: firstOffer.price.amount,
          currency: firstOffer.price.currencyCode,
        })
        onSuccess(updatedPriceIntent)
      }
    },
    onError(error) {
      datadogLogs.logger.error('Failed to confirm price intent', {
        error,
        priceIntentId: priceIntent.id,
      })
    },
  })

  const [handleSubmit, loadingUpdate] = useHandleSubmitPriceCalculator({
    priceIntent,
    onSuccess(updatedPriceIntent) {
      if (isFormReadyToConfirm({ form, priceIntent: updatedPriceIntent })) {
        confirmPriceIntent()
      }
      onUpdated(updatedPriceIntent)
    },
  })

  const isLoading = loadingUpdate || loadingConfirm || loading

  return (
    <PriceCalculatorAccordion form={form}>
      {(section, sectionIndex) => (
        <PriceCalculatorSection section={section} onSubmit={handleSubmit} loading={isLoading}>
          <FormGrid items={section.items}>
            {(field, index) => (
              <AutomaticField
                field={field}
                onSubmit={handleSubmit}
                loading={isLoading}
                // We don't want to mess up focusing for the user by setting autoFocus on the
                // first item in the form, since that would make it unintuitive to navigate our
                // site. But when the user is in the form editing, even having submitted the first
                // section, we want to set autoFocus for the next section. Hence sectionIndex > 0
                autoFocus={sectionIndex > 0 && index === 0}
              />
            )}
          </FormGrid>
        </PriceCalculatorSection>
      )}
    </PriceCalculatorAccordion>
  )
}

type IsFormReadyToConfirmParams = {
  form: Form
  priceIntent: PriceIntent
}

const isFormReadyToConfirm = ({ form, priceIntent }: IsFormReadyToConfirmParams) => {
  const filledForm = prefillData({ form, data: priceIntent.data, valueField: 'value' })
  const updatedForm = updateFormState(filledForm)
  return updatedForm.sections.every((section) => section.state === 'valid')
}