import React from 'react'
import { Heading, Tooltip, Flex } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

import Card from '../Card'
import Value from '../Value'

const Overview: React.FC = () => {
  return (
    <Card mb={{ base: 2, md: 0 }} mr={{ base: 0, md: 2 }} minW={{ base: 'auto', xl: '380px' }}>
      <Heading size="md" color="#F3BA2F">
        Your Stake&nbsp;
        <Tooltip label="Stake your $METARUN tokens here to earn $S-METARUN" mx={2}>
          <InfoOutlineIcon />
        </Tooltip>
      </Heading>
      <Flex direction="column" justify="center" mt={8} color="white" flex={1}>
        <Value title="METARUN STAKED" amount={123123} />
        <Value title="S-METARUN EARNED" amount={1231} mt={4} />
      </Flex>
    </Card>
  )
}

export default Overview
