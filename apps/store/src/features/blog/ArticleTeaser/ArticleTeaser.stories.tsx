import { type Meta, type StoryObj } from '@storybook/react'
import { ArticleTeaser } from './ArticleTeaser'

const meta: Meta = {
  title: 'Blog / Article Teaser',
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  render: () => (
    <ArticleTeaser.Root
      href="/se"
      title="Hedvig och Mimmi Blomqvist lanserar hundskålar i limiterad upplaga"
      ingress="I ett nytt samarbete har Hedvig tillsammans med designern Mimmi Blomqvist ställt sig frågan
        vad som händer när en hundskål inte bara fyller en funktion, utan också blir ett
        designobjekt. Resultatet är en limiterad upplaga handgjorda hundskålar i porslin med Mimmi
        Blomqvists karaktäristiska formspråk."
      date="2021.05.12"
    >
      <ArticleTeaser.Image
        src="https://www.hedvig.com/f/62762/800x450/42924b7dde/mimmi-thumbnail.jpg"
        width={800}
        height={450}
        alt="Mimmi"
      />
    </ArticleTeaser.Root>
  ),
}
