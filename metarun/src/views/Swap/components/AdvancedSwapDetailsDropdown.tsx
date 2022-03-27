import React from 'react'
import { Box } from '@chakra-ui/react'
import useLastTruthy from 'hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)
  const show = Boolean(trade)

  return (
    <Box
      py={4}
      bg="#191326"
      rounded="md"
      w={{ base: '90%', lg: '650px' }}
      mt={show ? 4 : 0}
      transform={show ? 'translateY(0)' : 'translateY(-100%)'}
    >
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </Box>
  )
}
