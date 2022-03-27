import React from 'react'
import { Container, Flex } from '@chakra-ui/react'

import Title from './components/Title'
import Overview from './components/Overview'
import StakingPools from './components/StakingPools'

export default function LPFarm() {
  return (
    <div style={{ background: 'linear-gradient(181deg,#47454b 0%,#000000 100%)' }}>
      <Container maxW="container.xl" mx="auto" py={8}>
        <Title display="inline-block">LP Farm</Title>
        <Flex direction={{ base: 'column', md: 'column' }} my={8} justify="space-between">
          <Overview />
          <StakingPools />
        </Flex>
      </Container>
    </div>
  )
}
