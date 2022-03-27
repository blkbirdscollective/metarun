/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  Box,
  Flex,
  Center,
  Stack,
  VStack,
  Badge,
  Text,
  Tooltip,
  Divider,
  CircularProgress,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

// import { getROI } from 'LPstaking/utils'
import StakingModal from './StakingModal'
import TokenContractProvider from '../contexts/TokenContractProvider'

const PoolOverlay = ({ children }) => (
  <Center className="loader" pos="absolute" top={0} left={0} right={0} bottom={0} bg="#000">
    {children}
  </Center>
)

export const Loader = ({ color = 'blue.300' }) => (
  <PoolOverlay>
    <CircularProgress isIndeterminate color={color} />
  </PoolOverlay>
)

const NotConnected = () => (
  <PoolOverlay>
    <Text color="gray.800">Not Connected</Text>
  </PoolOverlay>
)

const apyDescription = 'APY is the return over your total staked amount'

const Pool = ({
  contract,
  isLoading,
  isStaking,
  isUnavailable,
  onRefetch,
  // balance,
  // balanceInUSD,
  poolNumber,
  // poolReward,
  poolRewardPercent,
  // poolDays,
  // fullMaturityTime,
  // poolLimit,
  // poolStaked,
  // poolDepositTime,
  // poolBal,
  // totalDeposits,
  // maxPayout,
  // tokenBalance,
  // stakeLimit,
  // rewardEarned,
  token,
}) => (
  <Box bg="#414483" color="#fff" my={4} p={4} borderRadius="md" boxShadow="md" pos="relative" overflow="hidden">
    {isUnavailable ? <NotConnected /> : isLoading ? <Loader /> : null}
    <Stack direction="row">
      <Badge colorScheme="orange">New</Badge>
      {/* {isStaking && <Badge colorScheme="green">Staking</Badge>} */}
    </Stack>
    <Flex justify="space-between" align="flex-start" className="pool-content" py={2}>
      <Flex>
        <Text fontSize={['xl', 'xl', 'xl']} color="white">
          {/* {balance} YARL */}
          Stake METARUN-BNB LP Tokens
          <br />
          Earn METARUN Tokens
        </Text>
      </Flex>
      <Text fontSize={['md', 'md']} color="white">
        <Stat>
          <StatNumber>
            {poolRewardPercent}% APY
            <Tooltip label={apyDescription}>
              <InfoIcon mb={1} ml={2} />
            </Tooltip>
          </StatNumber>
          <StatHelpText>
            {/* expected reward */}
            <StatArrow type="increase" />
           { 0}
           {/* { poolReward} */}
          </StatHelpText>
        </Stat>
      </Text>
    </Flex>
    <Divider />
    {/* <Flex color="gray.500" justify="space-evenly" wrap="wrap" my={2} className="pool-extra-info">
      <VStack px={4} py={2}>
        <Text color="white">YARL-BNB LP Tokens Staked</Text>
        <Text>{poolStaked}</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Pool Balance</Text>
        <Text>{poolBal}</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">ROI</Text>
        <Text>{(getROI((parseFloat((poolRewardPercent/360) * poolDays).toString().match(/^-?\d+(?:\.\d{0,3})?/)[0]), poolBal)/ 100).toFixed(2) }</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Stake duration</Text>
        <Text>{poolDays} days</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Stake Limit</Text>
        <Text>{parseFloat(poolLimit).toLocaleString()}</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Maturity Date</Text>
        <Text>{fullMaturityTime}</Text>
      </VStack>
    </Flex> */}
    <Flex color="gray.500" justify="space-evenly" wrap="wrap" my={2} className="pool-extra-info">
      <VStack px={4} py={2}>
        <Text color="white">METARUN-BNB LP Tokens Staked</Text>
        <Text>--</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Pool Balance</Text>
        <Text>--</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">ROI</Text>
        <Text>--</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Stake duration</Text>
        <Text>--</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Stake Limit</Text>
        <Text>--</Text>
      </VStack>
      <VStack px={4} py={2}>
        <Text color="white">Maturity Date</Text>
        <Text>--</Text>
      </VStack>
    </Flex>
    <Flex justify="flex-end">
      <StakingModal
        contract={contract}
        poolNumber={poolNumber}
        isStaking={isStaking}
        isTriggerDisabled={isUnavailable}
        onRefetch={onRefetch}
        token={token}
      />
    </Flex>
    <TokenContractProvider address={token} />
  </Box>
)

export default Pool
