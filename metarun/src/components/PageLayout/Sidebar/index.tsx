import React from 'react'
import {
  Flex,
  Drawer,
  Image,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  Link,
} from '@chakra-ui/react'

import { FaTwitter, FaTelegram, FaMedium } from 'react-icons/fa'

import { colors } from 'components/Colors'
import Links from './Links'

interface ISidebarProps {
  isMobileSidebarOpen: boolean
  onMobileSidebarClose: () => void
}

const SocialMedia: React.FC = () => {
  return (
    <Flex justify="center" my={8}>
      <Link href="https://twitter.com/MetarunGame" isExternal mr={4}>
        <FaTwitter color={colors.white} fontSize="32px" />
      </Link>
      <Link href="https://t.me/metarungame" isExternal mr={4}>
        <FaTelegram color={colors.white} fontSize="32px" />
      </Link>
      <Link href="https://metarungame.medium.com/" isExternal>
        <FaMedium color={colors.white} fontSize="32px" />
      </Link>
    </Flex>
  )
}

const Sidebar: React.FC<ISidebarProps> = ({ isMobileSidebarOpen, onMobileSidebarClose }) => {
  return (
    <>
      <Flex
        zIndex={2}
        display={{ base: 'none', lg: 'flex' }}
        overflow="hidden"
        w={{ base: '200px', lg: '300px' }}
        // boxShadow={`2px 0 0 ${colors.secondary}`}
        maxH="calc(100vh - 92px)"
        direction="column"
      >
        <Links />
        <SocialMedia />
      </Flex>
      <Drawer onClose={onMobileSidebarClose} isOpen={isMobileSidebarOpen} placement="left" size="xs">
        <DrawerOverlay />
        <DrawerContent bg="black">
          <DrawerHeader>
            <Image p={2} mx="auto" src="/images/METARUN.png" alt="METARUN Logo" h="60px" />
          </DrawerHeader>
          <DrawerCloseButton color="white" />
          <DrawerBody display="flex" flexDirection="column">
            <Links flex={1} />
            <DrawerFooter>
              <SocialMedia />
            </DrawerFooter>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
