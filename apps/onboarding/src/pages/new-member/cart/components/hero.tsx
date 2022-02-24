import { mq } from 'ui'
import styled from '@emotion/styled'

const Wrapper = styled.div({
  width: '100%',
  maxHeight: '600px',
  overflow: 'hidden',

  [mq.lg]: {
    position: 'fixed',
    maxHeight: 'none',
    width: '50vw',
    height: '100vh',
  },
})

const Img = styled.img({
  width: '100%',
  [mq.lg]: {
    height: '100%',
    width: '50vw',
    objectFit: 'cover',
  },
})

export const Hero = () => {
  return (
    <Wrapper>
      <picture>
        <source media="(orientation: portrait)" srcSet="/racoon-assets/hero_mobile.jpg" />
        <source media="(orientation: landscape)" srcSet="/racoon-assets/hero_desktop.jpg" />
        <Img src="/racoon-assets/hero_mobile.jpg" />
      </picture>
    </Wrapper>
  )
}
