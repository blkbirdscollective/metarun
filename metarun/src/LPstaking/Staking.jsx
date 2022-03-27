import React, { useState, useCallback } from 'react'
import { SlideFade, useDisclosure, Heading, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import Title from './components/Title'
import PoolList from './components/PoolList'

function Staking() {
  const { isOpen } = useDisclosure({ defaultIsOpen: true })
  const { account } = useActiveWeb3React()

  // eslint-disable-next-line
  const [totalStaked, setTotalStaked] = useState({ yarl: 0, usd: 0, token: null })

  const updateTotalStaked = useCallback((amount, amountInUsd, token) => {
    setTotalStaked({ yarl: amount, usd: amountInUsd, token })
  }, [])

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <SlideFade direction="left" offsetY="40px" in={isOpen}>
      <Title color='#FFF'>Available Pools</Title>
      {!account ? (
        <StyledNotFound>
          <Heading color='#FFF' scale="xxl">401</Heading>
          <Text color='#FFF' mb="16px">Oops, not connected.</Text>
        </StyledNotFound>
      ) : (
        <>
          <PoolList onUpdateTotalStaked={updateTotalStaked} />
        </>
      )}
    </SlideFade>
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
