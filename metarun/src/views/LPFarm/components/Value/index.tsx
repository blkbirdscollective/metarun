import React from 'react'
import { Box, Text } from '@chakra-ui/react'

const Value: React.FC<{ title: string; amount: number; [x: string]: any }> = ({ title, amount, ...props }) => (
  <Box {...props}>
    <Text textAlign="right">{title}</Text>
    <Box p={2} rounded="5px" bg="black" border="2px solid #F3BA2F" mt={3}>
      <Text align="center" fontSize="2xl">
        {amount.toLocaleString()}
      </Text>
    </Box>
  </Box>
)

export default Value
