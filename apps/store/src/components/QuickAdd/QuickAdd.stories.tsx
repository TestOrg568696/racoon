import { type Meta, type StoryObj } from '@storybook/react'
import { Button, Text } from 'ui'
import { StartDate } from '@/components/ProductItem/StartDate'
import { CurrencyCode } from '@/services/apollo/generated'
import { ProductDetail, QuickAdd } from './QuickAdd'

const meta: Meta<typeof QuickAdd> = {
  title: 'Components / Quick Add',
  component: QuickAdd,
}

export default meta
type Story = StoryObj<typeof QuickAdd>

export const Default: Story = {
  args: {
    title: 'Accident insurance',
    subtitle: 'Covers 2 people',
    pillow: {
      src: 'https://a.storyblok.com/f/165473/832x832/a61cfbf4ae/hedvig-pillows-cat.png',
    },
    href: '/se',
    price: {
      currencyCode: CurrencyCode.Sek,
      amount: 99,
    },
    Body: (
      <Text as="p" color="textTranslucentSecondary">
        Få upp till 1 miljon kronor i ersättning för skador och förlorad arbetsförmåga vid olycka.
        Ingen självrisk.
      </Text>
    ),
    children: (
      <>
        <Button size="medium">Buy</Button>
        <Button size="medium" variant="ghost">
          Details
        </Button>
      </>
    ),
  },
}

export const WithDiscount: Story = {
  args: {
    ...Default.args,
    price: {
      currencyCode: CurrencyCode.Sek,
      amount: 99,
      reducedAmount: 49,
    },
  },
}

export const Loading: Story = {
  args: {
    ...Default.args,
    children: (
      <>
        <Button size="medium" loading={true}>
          Buy
        </Button>
        <Button size="medium" variant="ghost">
          Details
        </Button>
      </>
    ),
  },
}

export const Complete: Story = {
  args: {
    ...Default.args,
    Body: (
      <ul>
        <ProductDetail value="Folksam">Insurance company</ProductDetail>
        <ProductDetail value="AHK 234">License</ProductDetail>
        <ProductDetail value="1000 km/year">Milage</ProductDetail>
        <ProductDetail value="Full insurance">Tier</ProductDetail>
        <ProductDetail value="2024.04.24">
          <StartDate label="Activates" tooltip="Some explanation here." />
        </ProductDetail>
      </ul>
    ),
  },
}

export const WithoutPrice: Story = {
  args: {
    ...Default.args,
    price: undefined,
  },
}
