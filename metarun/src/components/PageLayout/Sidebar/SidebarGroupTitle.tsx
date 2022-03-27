import React from 'react'
import { Box, Text } from '@chakra-ui/react'
import { colors } from 'components/Colors'

interface ISidebarGroupTitle {
  children: React.ReactNode
}

const SidebarGroupTitle: React.FC<ISidebarGroupTitle> = ({ children }) => {
  return (
    <Box mb={2}>
      <Text fontSize='2xl' color={colors.white}>{children}</Text>
    </Box>
  )
}

export default SidebarGroupTitle
