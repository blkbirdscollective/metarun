import React from 'react'
import { Container, Flex } from '@chakra-ui/react'

import Title from 'components/Title'
import Overview from './components/Overview'
import StakingPools from './components/StakingPools'
import Marketplace from './components/Marketplace'

export default function NftFarm() {
  return (
    <div>
      <Container maxW="container.xl" mx="auto" py={8}>
        <Title display="inline-block">NFT Farm</Title>
        <Flex direction={{ base: 'column', md: 'row' }} my={8} justify="center">
          <Overview />
          <StakingPools />
        </Flex>
        <Marketplace />
      </Container>
    </div>
  )
}
