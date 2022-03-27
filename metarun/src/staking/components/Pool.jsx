/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import {
  Box,
  Flex,
  Center,
  Stack,
  Badge,
  Text,
  Tooltip,
  Divider,
  CircularProgress,
  StatGroup,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

import { colors } from 'components/Colors'
import StakingModal from './StakingModal'

const PoolOverlay = ({ children }) => (
  <Center
    className="loader"
    pos="absolute"
    top={0}
    left={0}
    right={0}
    bottom={0}
    bg="#193150"
    zIndex={999}
    transform="scale(1)"
  >
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

const PoolData = ({ title, value }) => (
  <Stat textAlign="center" minW="150px" p={2} size="sm" color={colors.white} fontWeight='bold'>
    <StatLabel>{title}</StatLabel>
    <StatNumber>{value}</StatNumber>
  </Stat>
)

const apyDescription = 'APY is the return over your total staked amount'

const Pool = ({
  contract,
  isLoading,
  isStaking,
  isUnavailable,
  onRefetch,
  balance,
  // balanceInUSD,
  // tokenBalance,
  rewardEarned,
  // stakeLimit,
  stakeMinimal,
  stakeDuration,
  APY,
  EMAPY,
  ttm,
  ttem,
}) => (
  <Box
    color={colors.white}
    mt={4}
    mb={8}
    p={8}
    rounded="xl"
    pos="relative"
    overflow="hidden"
    className='glass'
  >
    {isUnavailable ? <NotConnected /> : isLoading ? <Loader /> : null}
    <Stack direction="row" pb={2}>
      <Badge colorScheme="blue">New</Badge>
      {isStaking && <Badge colorScheme="green">Staking</Badge>}
    </Stack>
    <Flex justify="space-between" align="flex-start" className="pool-content" py={2}>
      <Flex>
        <Text fontSize={['xl', '3xl', '3xl']} color="white">
          {parseFloat(balance).toLocaleString()} METARUN
        </Text>
        {/* <Text ml={2} fontSize={["xl", "3xl", "3xl"]} color="gray.200">
					{balanceInUSD}
				</Text> */}
      </Flex>
      <Flex direction='column'>
      <Text fontSize={['lg', 'xl']} color={colors.white}>
       Maturity {APY} APY
        <Tooltip label={apyDescription}>
          <InfoIcon mb={1} ml={2} />
        </Tooltip>
      </Text>
      <Text fontSize={['lg', 'xl']} color={colors.white}>
       Early Maturity {EMAPY} APY
        <Tooltip label={apyDescription}>
          <InfoIcon mb={1} ml={2} />
        </Tooltip>
      </Text>
      </Flex>
    </Flex>
    {!isLoading && <Divider mb={4} />}
    <StatGroup py={2} flexWrap="wrap">
      {/* <PoolData title="Pool Balance" value={tokenBalance} /> */}
      <PoolData title="Reward Earned" value={rewardEarned} />
      <PoolData title="Stake Duration" value={stakeDuration} />
      <PoolData title="Stake Minimal" value={stakeMinimal.toLocaleString()} />
      {/* <PoolData title="Wallet Limit" value="100000" /> */}
      <PoolData title="Early Maturity Date" value={ttem} />
      <PoolData title="Maturity Date" value={ttm} />
    </StatGroup>

    <Flex justify="flex-end" mt={4}>
      <StakingModal contract={contract} isStaking={isStaking} isTriggerDisabled={isUnavailable} onRefetch={onRefetch} />
    </Flex>
  </Box>
)

export default Pool
