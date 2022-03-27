import React from 'react'
import { Heading, Tooltip, Box } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'

import Card from '../Card'
import Value from '../Value'

const Overview: React.FC = () => {
  return (
    <Card mb={{ base: 2, md: 4 }} mr={{ base: 0, md: 0 }}>
      <Heading size="md" color="#F3BA2F">
        Your Stake&nbsp;
        <Tooltip label="Stake your $METARUN tokens here to earn $S-METARUN" mx={2}>
          <InfoOutlineIcon />
        </Tooltip>
      </Heading>
      <Box flexDirection="row" display='flex' justifyContent='space-evenly' mt={8} color="white">
        <Value title="TOTAL STAKED" amount={123123} />
        <Value title="S-METARUN EARNED" amount={1231} mt={0} />
        <Value title="S-METARUN PAYOUT" amount={500} mt={0} />
      </Box>
    </Card>
  )
}

export default Overview
