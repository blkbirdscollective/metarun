import React, { useState } from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'

import { colors } from 'components/Colors'
import Sidebar from './Sidebar'
import Menu from './Menu'

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [menuHeight, setMenuHeight] = useState(92)

  return (
    <Flex direction="column"  bgImage="/images/bg_metarun.png" bgColor={colors.tertiary} h="100vh" className='main-bg'>
      <Menu onUpdateMenuHeight={setMenuHeight} onMobileSidebarOpen={onOpen} />
      <Flex flex={1}>
        <Sidebar isMobileSidebarOpen={isOpen} onMobileSidebarClose={onClose} />
        <Flex
          direction="column"
          flex={1}
          overflowY="auto"
          h={`calc(100vh - ${menuHeight}px)`}
          bgPos='50% 50%'
          bgSize="cover"
          // bgAttachment="cover"
          bgRepeat="no-repeat"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PageLayout
