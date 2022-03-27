import React from 'react'
import { Text, Heading, Grid, GridItem } from '@chakra-ui/react'

import Card from '../Card'
import StakeModal from '../StakeModal'

const PoolData: React.FC<{ title: string; value: any }> = ({ title, value }) => (
  <GridItem py={4}>
    <Text color="white" fontSize={{ base: 'md', lg: 'lg' }}>
      {title}
    </Text>
    <Text color="gray.500" fontSize={{ base: 'md', lg: 'lg' }}>
      {value}
    </Text>
  </GridItem>
)

const StakingPools: React.FC = () => {
  return (
    <Card initial={false} flex={1} pos="relative" overflow="hidden" minH="350px">
      <Heading size="lg" color="#F3BA2F">
        0 METARUN{' '}
        <Text as="span" fontWeight="light" color="gray.200">
          (5% APY)
        </Text>
      </Heading>

      <Grid flex={1} templateColumns={{ base: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}>
        <PoolData title="Pool Balance" value="Too many numbers" />
        <PoolData title="Reward Earned" value="0" />
        <PoolData title="Stake Duration" value="--" />
        <PoolData title="Stake Limit" value="7 Days" />
        <PoolData title="Early Maturity" value="0" />
        <PoolData title="Maturity Date" value="--" />
      </Grid>

      <StakeModal />
    </Card>
  )
}

export default StakingPools
