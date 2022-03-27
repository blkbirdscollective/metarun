import React from 'react'
import { motion } from 'framer-motion'
import { Flex, Box, useDisclosure } from '@chakra-ui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons'
import { colors } from 'components/Colors'
import SidebarGroupTitle from './SidebarGroupTitle'

interface ISidebarGroup {
  children: React.ReactNode
  title: string
}

const MotionBox = motion(Box)

const variants = {
  open: { height: 'auto' },
  closed: { height: 0 },
}

const SidebarGroup: React.FC<ISidebarGroup> = ({ children, title }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true })

  return (
    <Box mb={4}>
      <Flex justify="space-between" onClick={onToggle} cursor="pointer">
        <SidebarGroupTitle>{title}</SidebarGroupTitle>
        {isOpen ? <ChevronDownIcon color={colors.secondary} /> : <ChevronUpIcon color={colors.secondary} />}
      </Flex>
      <MotionBox animate={isOpen ? 'open' : 'closed'} variants={variants} overflow="hidden">
        {children}
      </MotionBox>
    </Box>
  )
}

export default SidebarGroup
