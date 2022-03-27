/* eslint-disable react/jsx-filename-extension */
import React, { useCallback, useEffect, useState } from 'react'
import { Box,
  //  Center 
  } from '@chakra-ui/react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

import PoolContainer from '../containers/Pool'
// import EmptyPool from '../assets/img/EmptyPool'

import useStakingContract from '../hooks/useStakingContract'

const Gradient = () => (
  <Box
    pos="absolute"
    top={0}
    right={0}
    bottom={0}
    left={0}
    bgGradient="linear(to-b, transparent 5%, whiteAlpha.900 40%)"
    zIndex={3}
  />
)

export default function PoolList({ onUpdateTotalStaked }) {
  const { account } = useActiveWeb3React()
  // const { authData } = useAuthContext();
  const isLoggedIn = Boolean(account)
  const [pools, setPools] = useState([])
  const stakingContract = useStakingContract()

  const staking = useCallback(() => {
    if (!stakingContract) return
    stakingContract.totalPools().then((totalPools) => {
      for (let poolId = 0; poolId < totalPools; poolId++) {
        stakingContract.poolInfo(poolId).then((poolInfo) => setPools((previous) => [...previous, poolInfo]))
      }
    })
  }, [stakingContract])

  useEffect(() => {
    if (isLoggedIn) {
      staking()
    }
  }, [staking, isLoggedIn])

  return (
    <Box id="pools" my={12} pos="relative">
      {!isLoggedIn && <Gradient />}
      {/* {pools.length === 0 && (
        <Center>
          <EmptyPool />
        </Center>
      )} */}
      {isLoggedIn &&
        pools.map((pool) => (
          <PoolContainer key={pool.poolDays} pool={pool} isLoggedIn={isLoggedIn} onUpdateTotalStaked={onUpdateTotalStaked} />
        ))}
    </Box>
  )
}
