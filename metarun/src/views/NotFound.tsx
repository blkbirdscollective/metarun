import React from 'react'
import styled from 'styled-components'
import {
  Heading,
  Text,
  //  LogoIcon
} from '@blkbirds/uikit'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { Button } from '@chakra-ui/react'
import { colors } from 'components/Colors'

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledNotFound>
        {/* <LogoIcon width="64px" mb="8px" /> */}
        <Heading scale="xxl">404</Heading>
        <Text mb="16px">{t('Oops, page not found.')}</Text>
        <Button  to="/" scale="sm" bgGradient={`linear(to-l, ${colors.default}, ${colors.primary})`} color={colors.white}>
          Back Home
        </Button>
      </StyledNotFound>
    </Page>
  )
}

export default NotFound
