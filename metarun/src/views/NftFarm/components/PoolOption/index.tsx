import { Box, Center, Heading, Text } from '@chakra-ui/react'

const PoolOption: React.FC<{ apy: string }> = ({ apy }) => {
  return (
    <Box>
      <Center
        w="95%"
        h="100px"
        rounded="full"
        p={2}
        my={4}
        bg="black"
        textAlign="center"
        mx="auto"
        color="white"
        flexDirection="column"
        cursor="pointer"
        transition="transform .2s ease-in-out"
        _hover={{ transform: 'scale(1.05)' }}
      >
        <Heading>{apy}</Heading>
        <Text>APY</Text>
      </Center>
    </Box>
  )
}

export default PoolOption
