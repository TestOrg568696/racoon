import styled from '@emotion/styled'
import { ConditionalWrapper, getMediaQueryBreakpoint, mq, theme } from 'ui'
import { Video, VideoProps } from '@/components/Video/Video'
import { SbBaseBlockProps, StoryblokAsset } from '@/services/storyblok/storyblok'
import { getOptimizedImageUrl } from '@/services/storyblok/Storyblok.helpers'

export type VideoBlockProps = SbBaseBlockProps<
  {
    // TODO: Remove video field once migrated to videoUrl
    video: StoryblokAsset
    videoUrl?: string
    poster?: StoryblokAsset
    fullBleed?: boolean
    controls?: boolean
  } & Pick<
    VideoProps,
    | 'autoPlay'
    | 'aspectRatioLandscape'
    | 'aspectRatioPortrait'
    | 'maxHeightLandscape'
    | 'maxHeightPortrait'
    | 'hideSoundControl'
  >
> & { className?: string }

export const VideoBlock = ({ className, blok, nested = false }: VideoBlockProps) => {
  const posterUrl = blok.poster?.filename
    ? getOptimizedImageUrl(blok.poster.filename, {
        maxWidth: getMediaQueryBreakpoint('lg'),
      })
    : undefined
  return (
    <ConditionalWrapper
      condition={!(blok.fullBleed || nested)}
      wrapWith={(children) => <Wrapper className={className}>{children}</Wrapper>}
    >
      <Video
        sources={[{ url: blok.videoUrl || blok.video.filename }]}
        poster={posterUrl}
        autoPlay={blok.autoPlay}
        aspectRatioLandscape={blok.aspectRatioLandscape}
        aspectRatioPortrait={blok.aspectRatioPortrait}
        maxHeightLandscape={blok.maxHeightLandscape}
        maxHeightPortrait={blok.maxHeightPortrait}
        roundedCorners={!blok.fullBleed}
        showControls={blok.controls}
        hideSoundControl={blok.hideSoundControl}
      />
    </ConditionalWrapper>
  )
}
VideoBlock.blockName = 'videoBlock'

const Wrapper = styled.div({
  paddingInline: theme.space.xs,
  [mq.lg]: {
    paddingInline: theme.space.md,
  },
})
