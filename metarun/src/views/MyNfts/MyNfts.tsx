import React from 'react'
import { Container, Grid, GridItem, Box, Text, Image } from '@chakra-ui/react'

import SectionTitle from 'components/SectionTitle'
import { useFetchNfts, useNfts } from 'state/nfts/hooks'

const MyNfts: React.FC = () => {
  const { nfts } = useNfts()

  useFetchNfts()

  return (
    <Container maxW="container.xl" py={6}>
      <SectionTitle title="My NFTs" caption="Transfer, list and see your NFTs" />
      <Grid
        mt={8}
        templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', xl: 'repeat(5, 1fr)' }}
      >
        {nfts.map(({ id, src, amount }) => (
          <GridItem w="100%" key={id} pos="relative">
            <Image src={src} alt="METARUN Card" />
            <Box
              display="inline-block"
              px={4}
              py={2}
              bgColor="#F3BA2F"
              textAlign="right"
              rounded="lg"
              pos="absolute"
              top={4}
              right={0}
              shadow="lg"
            >
              <Text color="white" fontSize="2xl">
                x{amount}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Container>
  )
}

export default MyNfts
