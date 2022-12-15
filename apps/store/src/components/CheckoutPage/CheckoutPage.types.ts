import { CartCampaign, CartCost, CartEntry } from '@/components/CartInventory/CartInventory.types'

export type CheckoutPageProps = {
  checkoutId: string
  checkoutSigningId: string | null
  cart: {
    id: string
    entries: Array<CartEntry>
    cost: CartCost
    campaigns: Array<CartCampaign>
  }
  prefilledData: {
    email?: string
    firstName?: string
    lastName?: string
    personalNumber?: string
    phoneNumber?: string
  }
}
