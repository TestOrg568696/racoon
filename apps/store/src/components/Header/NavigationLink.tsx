import styled from '@emotion/styled'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import Link, { LinkProps } from 'next/link'
import { Badge, mq, Space, Text, theme } from 'ui'
import { Pillow } from '@/components/Pillow/Pillow'
import { focusableStyles } from './HeaderStyles'

const StyledSecondaryNavigationLink = styled(NavigationMenuPrimitive.Link)({
  alignSelf: 'center',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
  ...focusableStyles,
})

const ProductNavigationLinkCard = styled(Space)({
  ...focusableStyles,
  display: 'flex',
  columnGap: theme.space.sm,
  placeItems: 'center',
  flexShrink: 0,
  paddingBlock: theme.space.xs,

  [mq.lg]: {
    columnGap: theme.space.xs,
    paddingInline: theme.space.xs,
    borderRadius: theme.radius.sm,
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: theme.colors.grayTranslucent100,
      },
    },
  },
})

type NavigationLinkProps = Pick<LinkProps, 'href'> &
  Omit<NavigationMenuPrimitive.NavigationMenuLinkProps, 'href'> & {
    pillowImageSrc?: string
    label?: string
  }

export const NavigationLink = ({ href, children, ...rest }: NavigationLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <StyledNavigationLink {...rest}>{children}</StyledNavigationLink>
    </Link>
  )
}

const StyledNavigationLink = styled(NavigationMenuPrimitive.Link)({
  ...focusableStyles,
  display: 'block',
  paddingBlock: theme.space.lg,

  [mq.lg]: {
    paddingBlock: theme.space.xs,
    paddingInline: theme.space.md,

    borderRadius: theme.radius.sm,
    '@media (hover: hover)': {
      '&:hover': {
        backgroundColor: theme.colors.grayTranslucent100,
      },
    },
  },
})

export const ProductNavigationLink = ({
  href,
  children,
  pillowImageSrc,
  label,
}: NavigationLinkProps) => {
  return (
    <Link href={href}>
      <ProductNavigationLinkCard>
        <Pillow size="xsmall" src={pillowImageSrc} />
        <Text size={{ _: 'xl', lg: 'md' }}>{children}</Text>
        {label && (
          <Badge size={{ _: 'big', lg: 'small' }} as="span" color="green50">
            {label}
          </Badge>
        )}
      </ProductNavigationLinkCard>
    </Link>
  )
}

export const SecondaryNavigationLink = ({ href, children, ...rest }: NavigationLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      <StyledSecondaryNavigationLink {...rest}>{children}</StyledSecondaryNavigationLink>
    </Link>
  )
}
