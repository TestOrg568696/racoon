import type { GetServerSideProps, NextPageWithLayout } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ConfirmationPage } from '@/components/ConfirmationPage/ConfirmationPage'
import { getMobilePlatform } from '@/components/ConfirmationPage/ConfirmationPage.helpers'
import { ConfirmationPageProps } from '@/components/ConfirmationPage/ConfirmationPage.types'
import { LayoutWithMenu } from '@/components/LayoutWithMenu/LayoutWithMenu'
// import { PageLink } from '@/lib/PageLink'
import { initializeApollo } from '@/services/apollo/client'
import { getCurrentShopSessionServerSide } from '@/services/shopSession/ShopSession.helpers'
import { getGlobalStory } from '@/services/storyblok/storyblok'
import { isSupportedLocale } from '@/utils/isSupportedLocale'

export const getServerSideProps: GetServerSideProps<ConfirmationPageProps> = async ({
  req,
  res,
  locale,
}) => {
  if (!isSupportedLocale(locale)) return { notFound: true }

  const apolloClient = initializeApollo()

  const [shopSession, globalStory] = await Promise.all([
    getCurrentShopSessionServerSide({ req, res, apolloClient }),
    getGlobalStory({ locale }),
  ])

  // @TODO: uncomment after implementing signing
  // if (shopSession.checkout.completedAt === null) {
  //   return { redirect: { destination: PageLink.store({ locale }), permanent: false } }
  // }

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      globalStory,
      currency: shopSession.currencyCode,
      cost: { total: 0 },
      products: shopSession.cart.entries.map((item) => {
        const startDate = item.startDate

        if (startDate === null) throw new Error('startDate is null')

        return {
          name: item.title,
          startDate: item.startDate,
        }
      }),
      firstName: 'Josh',
      platform: getMobilePlatform(req.headers['user-agent'] ?? ''),
    },
  }
}

const CheckoutConfirmationPage: NextPageWithLayout<ConfirmationPageProps> = (props) => {
  return <ConfirmationPage {...props} />
}

CheckoutConfirmationPage.getLayout = (children) => <LayoutWithMenu>{children}</LayoutWithMenu>

export default CheckoutConfirmationPage
