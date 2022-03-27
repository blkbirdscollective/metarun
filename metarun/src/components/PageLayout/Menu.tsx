import React, { useRef, useCallback, useEffect, SetStateAction, Dispatch } from 'react'
import { useWeb3React } from '@web3-react/core'
import { AiOutlineLogout } from 'react-icons/ai'
import { Flex, Button, IconButton, Image } from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
// import { FaSun, FaMoon } from 'react-icons/fa'

import ConnectWalletButton from 'components/ConnectWalletButton'
import { colors } from 'components/Colors'

import useAuth from 'hooks/useAuth'
import truncateHash from 'utils/truncateHash'

interface IMenuProps {
  onUpdateMenuHeight: Dispatch<SetStateAction<number>>
  onMobileSidebarOpen: () => void
}

const Menu: React.FC<IMenuProps> = ({ onUpdateMenuHeight, onMobileSidebarOpen }) => {
  const menuRef = useRef(null)
  // const { colorMode, toggleColorMode } = useColorMode()

  const { account } = useWeb3React()
  const { logout } = useAuth()

  const onResize = useCallback(() => {
    if (menuRef && menuRef.current && menuRef.current.clientHeight > 0) {
      onUpdateMenuHeight(menuRef.current.clientHeight)
    }
  }, [menuRef, onUpdateMenuHeight])

  useEffect(() => {
    onResize()
  }, [onResize])

  useEffect(() => {
    // A little hack to grab the menu height
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [onResize])

  return (
    <Flex w="100%" bg='rgb(16, 16, 44)' justify="flex-start" align="center" ref={menuRef}>
      <Flex
        w={{ base: 'auto', lg: '300px' }}
        py={4}
        px={{ base: 2, lg: 8 }}
        justify={{ base: 'flex-start', lg: 'center' }}
        align="center"
      >
        <IconButton
          onClick={onMobileSidebarOpen}
          icon={<HamburgerIcon color="white" fontSize="xl" />}
          variant="ghost"
          aria-label="Drawer Icon"
          display={{ base: 'block', lg: 'none' }}
        />
        <Image
          p={0}
          display={{ base: 'none', lg: 'block' }}
          src="/images/METARUN.png"
          alt="METARUN Logo"
          h={{ base: '60px', lg: '60px' }}
          // w={{ base: '120px', lg: '200px' }}
        />
      </Flex>
      <Flex flex={1} justify="flex-end" align="center" px={{ base: 2, lg: 8 }}>
        {/* <IconButton
          mx={2}
          onClick={toggleColorMode}
          icon={
            colorMode === 'dark' ? <FaSun color="black" fontSize="20px" /> : <FaMoon color="black" fontSize="20px" />
          }
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          variant="ghost"
          aria-label="Toggle Color Mode"
        /> */}
        {account ? (
          <Button
            size="md"
            rounded="full"
            leftIcon={<AiOutlineLogout />}
            onClick={logout}
            variant="solid"
            bgColor='rgb(41, 44, 114)'
            color={colors.white}
            border={`1px solid ${colors.secondary}`}
            _hover={{ bgColor: colors.tertiary, opacity: 0.6 }}
          >
            {truncateHash(account)}
          </Button>
        ) : (
          <ConnectWalletButton scale="md" style={{ backgroundColor: 'rgb(41, 44, 114)', border: `1px solid ${colors.secondary}` }} />
        )}
      </Flex>
    </Flex>
  )
}

export default Menu
