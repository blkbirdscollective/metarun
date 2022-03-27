import React from 'react'
import { SlideFade, Container, Heading, Text, useDisclosure } from '@chakra-ui/react'

import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import FullPositionCard from 'components/PositionCard'
import SectionTitle from 'components/SectionTitle'
import SectionSubTitle from 'components/SectionSubTitle'
import PoolList from './components/PoolList'

function Staking({ allV2PairsWithLiquidity }) {
  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const { account } = useActiveWeb3React()

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Container maxW="container.xl">
      <SectionTitle title="Your stake" caption="Stake your $METARUN tokens here" />
      {allV2PairsWithLiquidity.length > 0 &&
        allV2PairsWithLiquidity.map((v2Pair) => (
          <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} mb="16px" />
        ))}
      <SlideFade direction="left" offsetY="40px" in={isOpen}>
        <SectionSubTitle mt={2}>Available Pools</SectionSubTitle>
        {!account && (
          <StyledNotFound>
            <Heading color="#fff" scale="xxl">
              401
            </Heading>
            <Text color="#fff" mb="16px">
              Oops, not connected.
            </Text>
          </StyledNotFound>
        )}
        {account && <PoolList />}
      </SlideFade>
    </Container>
  )
}

export default Staking

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 12rem;
  justify-content: center;
`
