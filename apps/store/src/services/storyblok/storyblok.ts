import { apiPlugin, getStoryblokApi, SbBlokData, storyblokInit, StoryData } from '@storyblok/react'
import { AccordionBlock } from '@/blocks/AccordionBlock'
import { AccordionItemBlock } from '@/blocks/AccordionItemBlock'
import { ButtonBlock } from '@/blocks/ButtonBlock'
import { CheckListBlock } from '@/blocks/CheckListBlock'
import { ContactSupportBlock } from '@/blocks/ContactSupportBlock'
import { ContentBlock } from '@/blocks/ContentBlock'
import { FooterBlock, FooterLink, FooterSection } from '@/blocks/FooterBlock'
import { HeadingBlock } from '@/blocks/HeadingBlock'
import { HeroBlock } from '@/blocks/HeroBlock'
import { ImageBlock } from '@/blocks/ImageBlock'
import { InsurableLimitsBlock } from '@/blocks/InsurableLimitsBlock'
import { PageBlock } from '@/blocks/PageBlock'
import { PriceCalculatorBlock } from '@/blocks/PriceCalculatorBlock'
import { ProductCardBlock } from '@/blocks/ProductCardBlock'
import { ProductGridBlock } from '@/blocks/ProductGridBlock'
import { ProductSlideshowBlock } from '@/blocks/ProductSlideshowBlock'
import { ProductSummaryBlock } from '@/blocks/ProductSummaryBlock'
import { SpacerBlock } from '@/blocks/SpacerBlock'
import { TabsBlock } from '@/blocks/TabsBlock'
import { TextBlock } from '@/blocks/TextBlock'
import { TimelineBlock } from '@/blocks/TimelineBlock'
import { TimelineItemBlock } from '@/blocks/TimelineItemBlock'
import { NavItemBlock, NestedNavContainerBlock, HeaderBlock } from '@/blocks/TopMenuBlock'
import { TopPickCardBlock } from '@/blocks/TopPickCardBlock'

export type SbBaseBlockProps<T> = {
  blok: SbBlokData & T
}

export type ExpectedBlockType<T> = T extends { blok: SbBlokData }
  ? T['blok'][]
  : `ExpectedBlock expects an argument which extends SbBlockData.
     These are likely the props of the block you are looking to render`

export type StoryblokQueryParams = {
  slug: string[]
}

export type StoryblokPageProps = {
  story: StoryData
  globalStory: GlobalStory
}

export type StoryblokImage = {
  alt: string
  copyright: string
  fieldtype: 'asset'
  filename: string
  focus: string
  id: number
  is_external_url: boolean
  name: string
  title: string
}

export type LinkField = {
  id: string
  url: string
  linktype: 'story' | 'url'
  cached_url: string // use this
}

export type ProductStory = StoryData & {
  content: StoryData['content'] & {
    name: string
    productId: string
    priceFormTemplateId: string
    body: Array<SbBlokData>
    global: Array<SbBlokData>
  }
}

type GlobalStory = StoryData & {
  content: StoryData['content'] & {
    navMenuContainer: Array<SbBlokData>
  }
}

type NamedBlock = {
  blockName: string
} & React.ElementType

export const initStoryblok = () => {
  const blockComponents: Array<NamedBlock> = [
    AccordionBlock,
    AccordionItemBlock,
    ButtonBlock,
    CheckListBlock,
    ContactSupportBlock,
    ContentBlock,
    FooterBlock,
    FooterLink,
    FooterSection,
    // TODO: Header vs Heading is easy to confuse.  Discuss with team if we should rename one of these
    HeaderBlock,
    HeadingBlock,
    HeroBlock,
    ImageBlock,
    InsurableLimitsBlock,
    NavItemBlock,
    NestedNavContainerBlock,
    PageBlock,
    PriceCalculatorBlock,
    ProductCardBlock,
    ProductGridBlock,
    ProductSlideshowBlock,
    ProductSummaryBlock,
    SpacerBlock,
    TabsBlock,
    TimelineBlock,
    TimelineItemBlock,
    TextBlock,
    TopPickCardBlock,
  ]
  const blockAliases = { product: PageBlock }
  const components = {
    ...Object.fromEntries(
      blockComponents.map((blockComponent) => [blockComponent.blockName, blockComponent]),
    ),
    ...blockAliases,
  }

  storyblokInit({
    accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
    use: [apiPlugin],
    components,
  })
}

export const getStoryBySlug = async (slug: string, preview = false) => {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
    version: preview ? 'draft' : 'published',
  })
  return data.story as StoryData
}

export const getAllLinks = async () => {
  const storyblokApi = getStoryblokApi()
  const { data } = await storyblokApi.get('cdn/links/')
  return data.links
}

export const getGlobalStory = async (preview = false) => {
  const story = await getStoryBySlug('global', preview)
  return story as GlobalStory
}

export const getProductStory = async (slug: string, preview = false) => {
  const story = await getStoryBySlug(`/products/${slug}`, preview)
  return story as ProductStory
}
