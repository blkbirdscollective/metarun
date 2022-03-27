import React from 'react'
import { Link } from 'react-router-dom'
import { LinkIcon } from '@chakra-ui/icons'
import Page from 'components/Layout/Page'
import AuthProvider from 'LPstaking/contexts/AuthProvider'
import { Container, Flex, Box, Heading, useColorModeValue, Text } from '@chakra-ui/react'
import Staking from '../../LPstaking/Staking'

export default function Pool() {
  const color = useColorModeValue('black', 'white')

  return (
    <Container maxW="container.xl">
      <Page>
        <Flex justify="space-between" wrap="wrap" mb={6}>
          <Box color={color} flex={1} mr={12} minW="220px" textAlign={{ base: 'center', sm: 'left' }} mx="auto">
            <Heading color='#FFF' size="3xl" wordBreak="keep-all">
              LP Stake
            </Heading>
            <Text color='#FFF' fontSize="xl" py={2}>
              Stake your $Cake-LP tokens here to earn $METARUN.
            </Text>
            <Text color='#FFF' fontSize="xl">
              {' '}
              Get your $Cake-LP tokens here{' '}
              <Link to="/liquidity">
                <LinkIcon />
              </Link>
            </Text>
          </Box>
        </Flex>
        <AuthProvider>
            <Staking />
        </AuthProvider>
      </Page>
    </Container>
  )
}
