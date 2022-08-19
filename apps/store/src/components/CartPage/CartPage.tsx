import styled from '@emotion/styled'
import Link from 'next/link'
import { Button, Heading, Space } from 'ui'
import { CartList } from '@/components/CartList/CartList'
import { PriceBreakdown } from '@/components/PriceBreakdown.tsx/PriceBreakdown'
import { PageLink } from '@/lib/PageLink'

export const CartPage = () => {
  const products = [
    { name: 'Home Insurance', cost: 250, currency: 'SEK' },
    { name: 'Apartment Insurance', cost: 100, currency: 'SEK' },
  ]
  const cost = { total: 350, subTotal: 250 }

  return (
    <Wrapper>
      <Space y={3}>
        <StyledHeading as="h1" variant="standard.24">
          Cart (2)
        </StyledHeading>
        <CartList products={products} />
        <Footer>
          <Space y={1.5}>
            <PriceBreakdown currency="SEK" products={products} cost={cost} />
            <Button fullWidth>
              <Link href={PageLink.cartReview()}>Check Out</Link>
            </Button>
          </Space>
        </Footer>
      </Space>
    </Wrapper>

  )
}

const Wrapper = styled.div(({ theme }) => ({
  marginTop: theme.space[7],
  height: '100vh',
}))

const StyledHeading = styled(Heading)({
  textAlign: 'center'
})

const Footer = styled.footer(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  padding: `0 ${theme.space[3]} ${theme.space[6]} ${theme.space[3]}`,
  a: {
    textDecoration: 'none',
  },
}))
