import type { GetStaticProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { LandingPage, LandingPageProps } from '@/components/LandingPage/LandingPage'
import {
  getInsurancesByLocaleLabel,
  getMainCoverageInsurances,
  getAdditionalCoverageInsurances,
  getFormInitialState,
} from '@/components/LandingPage/LandingPage.helpers'
import { LocaleLabel } from '@/lib/l10n/locales'

const NewMemberPage: NextPage<LandingPageProps> = ({
  mainCoverageInsurances,
  additionalCoverageInsurances,
  formInitialState,
}) => {
  const { t } = useTranslation()

  return (
    <>
      <Head>
        <title>{t('STARTPAGE_PAGE_TITLE')}</title>
      </Head>
      <LandingPage
        mainCoverageInsurances={mainCoverageInsurances}
        additionalCoverageInsurances={additionalCoverageInsurances}
        formInitialState={formInitialState}
      />
    </>
  )
}

export const getStaticProps: GetStaticProps<LandingPageProps> = async (context) => {
  // Skips prerendering this page for 'default' locale
  // https://nextjs.org/docs/advanced-features/i18n-routing#non-dynamic-getstaticprops-pages
  if (context.locale === 'default') {
    return { notFound: true }
  }

  const locale = context.locale as LocaleLabel
  const insurances = getInsurancesByLocaleLabel(locale)

  if (insurances.length === 0) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      mainCoverageInsurances: getMainCoverageInsurances(insurances),
      additionalCoverageInsurances: getAdditionalCoverageInsurances(insurances),
      formInitialState: getFormInitialState(insurances),
    },
  }
}

export default NewMemberPage
