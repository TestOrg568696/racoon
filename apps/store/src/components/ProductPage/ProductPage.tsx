import Head from 'next/head'
import { PriceCalculator } from '@/components/PriceCalculator/PriceCalculator'
import { ProductPageProps } from './ProductPage.types'

export const ProductPage = ({ cmsProduct }: ProductPageProps) => {
  return (
    <div>
      <Head>
        <title>{cmsProduct.pageTitle}</title>
      </Head>
      <h1>Product Page for {cmsProduct.displayName}</h1>

      <PriceCalculator />
    </div>
  )
}
