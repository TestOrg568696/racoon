import styled from '@emotion/styled'
import React, { useState, useCallback } from 'react'
import * as Accordion from '@/components/Accordion/Accordion'
import { SpaceFlex } from '@/components/SpaceFlex/SpaceFlex'
import { CoverageList } from './CoverageList'
import { Peril } from './Perils.types'

type Props = {
  items: Array<Peril>
}

export const Perils = ({ items }: Props) => {
  const [openedItems, setOpenedItems] = useState<Array<string>>()

  const handleValueChange = useCallback((value: Array<string>) => {
    setOpenedItems(value)
  }, [])

  return (
    <Accordion.Root type="multiple" value={openedItems} onValueChange={handleValueChange}>
      {items.map(({ id, icon, name, description, covered, notCovered }) => {
        return (
          <Accordion.Item key={id} value={name}>
            <Accordion.HeaderWithTrigger>
              <SpaceFlex space={0.5}>
                {icon}
                {name}
              </SpaceFlex>
            </Accordion.HeaderWithTrigger>
            <Accordion.Content>
              <ContentWrapper>
                <p>{description}</p>
                <CoverageList variant="covered" heading="Covered" items={covered} />
                <CoverageList variant="not-covered" heading="Not Covered" items={notCovered} />
              </ContentWrapper>
            </Accordion.Content>
          </Accordion.Item>
        )
      })}
    </Accordion.Root>
  )
}

const ContentWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[4],
  paddingLeft: theme.space[6],
  paddingBottom: theme.space[4],
  fontSize: theme.fontSizes[1],
  color: theme.colors.gray700,
}))
