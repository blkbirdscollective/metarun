import React from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'
import { colors } from 'components/Colors'

interface SectionTitleProps {
  title: string
  caption: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, caption }) => {
  return (
    <Flex justify="space-between" wrap="wrap" mb={6}>
      <Box flex={1} minW="220px" textAlign="left" mx="auto">
        <Heading color={colors.white} size="3xl" fontWeight='extrabold' style={{textTransform: 'uppercase'}}>
          {title}
        </Heading>
        <Text color={colors.white} fontSize="lg" fontFamily='inherit' py={4}>
          {caption}
        </Text>
      </Box>
    </Flex>
  )
}

export default SectionTitle
