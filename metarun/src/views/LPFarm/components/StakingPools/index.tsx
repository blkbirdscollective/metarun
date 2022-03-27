import React from 'react'
import {
  Text,
  Button,
  Heading,
  Grid,
  GridItem,
  Stat,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react'
import Card from '../Card'

const PoolData: React.FC<{ title: string; value: any }> = ({ title, value }) => (
  <GridItem py={4}>
    <Text color="white" fontSize="lg">
      {title}
    </Text>
    <Text color="gray.500" fontSize="lg">
      {value}
    </Text>
  </GridItem>
)

const StakingPools: React.FC = () => {
  return (
    <Card initial={false} flex={1} pos="relative" overflow="hidden" minH="350px">
      <Heading size="lg" color="#F3BA2F">
        0 METARUN{' '}
      </Heading>

      <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }}>
        <PoolData title="Pool Balance" value="Too many numbers" />
        <PoolData title="Reward Earned" value="0" />
        <PoolData title="Pool Reward" value="50" />
        {/* <PoolData title="Expected Reward" value="50" /> */}
        <PoolData title="Stake Limit" value="1000" />
        <PoolData title="Stake Duration" value="360 Days" />
        <PoolData title="Deposit Time" value="--" />
        <PoolData title="Maturity Date" value="--" />
      </Grid>

      <Button colorScheme="whiteAlpha" variant="solid" size="lg" isFullWidth mt={6}>
        Stake
      </Button>
      <Heading
        size="md"
        color="#F3BA2F"
        style={{
          position: 'absolute',
          top: '20px',
          right: '35px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          userSelect: 'none',
          border: 'none',
          outline: 'none',
          zIndex: 1000,
          transform: 'scale(1)',
        }}
      >
        <Text as="span" fontWeight="light" color="gray.600">
            <Stat>
              <StatNumber>(50% APY)</StatNumber>
              <StatHelpText>
                {/* expected reward */}
                <StatArrow type="increase" /> 
                23.36%
              </StatHelpText>
            </Stat>
        </Text>
      </Heading>
    </Card>
  )
}

export default StakingPools
