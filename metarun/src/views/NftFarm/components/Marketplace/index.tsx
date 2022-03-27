import React from 'react'
import { SimpleGrid, Box, Heading, Image, Text } from '@chakra-ui/react'

import FogOfMillenia from '../../dev/images/COMMON - Fog of Millenia.png'
import UnfortunateWeather from '../../dev/images/COMMON - Unfortunate Weather 2.png'
import RemainsOfASailor from '../../dev/images/COMMON - Remains of a Sailor 2.png'
import BabaYaga from '../../dev/images/LEGENDARY - Baba Yaga 2.png'
import TellMyFuture from '../../dev/images/RARE - Tell my future 2.png'
import YagaCurse from '../../dev/images/RARE - Yaga Curse 2.png'
import BloodyPirate from '../../dev/images/UNCOMMON - Bloody Pirate 2 .png'
import SailorInquisitor from '../../dev/images/UNCOMMON - Sailor Inquisitor.png'
import VoodooPuppet from '../../dev/images/UNCOMMON - Voodoo Puppet 2.png'
import UndeadMermaid from '../../dev/images/VERY RARE - Undead Mermaid 2 .png'

const items = [
  FogOfMillenia,
  UnfortunateWeather,
  RemainsOfASailor,
  BabaYaga,
  TellMyFuture,
  YagaCurse,
  BloodyPirate,
  SailorInquisitor,
  VoodooPuppet,
  UndeadMermaid,
]

interface IMarketplaceProps {
  imageSrc: string
  sYarlPrice: number
  bnbPrice: number
  yarlPrice: number
  availableAmount: number
}

const MarketplaceItem: React.FC<IMarketplaceProps> = ({ imageSrc, sYarlPrice, bnbPrice, yarlPrice }) => {
  return (
    <Box mb={8}>
      <Heading textAlign="center" size="md" color="#F3BA2F">
        14 available
      </Heading>
      <Image src={imageSrc} />
      <Box textAlign="right" color="white" w="90%">
        <Text>{sYarlPrice.toLocaleString()} S-METARUN</Text>
        <Text>{bnbPrice.toLocaleString()} BNB</Text>
        <Text>{yarlPrice.toLocaleString()} METARUN</Text>
      </Box>
    </Box>
  )
}

const getRandom = () => Math.floor(Math.random() * 232131)

const Marketplace: React.FC = () => {
  return (
    <Box bg="#131215" p={8}>
      <SimpleGrid minChildWidth="200px">
        {items.map((item) => (
          <MarketplaceItem
            key={item}
            imageSrc={item}
            availableAmount={14}
            yarlPrice={getRandom()}
            bnbPrice={getRandom()}
            sYarlPrice={getRandom()}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default Marketplace
