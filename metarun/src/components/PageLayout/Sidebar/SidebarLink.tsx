import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Flex, Text, Tag, TagLabel } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import { colors } from 'components/Colors'

interface ISidebarLinkProps {
  children: React.ReactNode
  pathname: string
  isToBeReleased: boolean
  isExternal: boolean
  [x: string]: any
}

const SidebarLink: React.FC<ISidebarLinkProps> = ({ children, pathname, isToBeReleased, isExternal, ...props }) => {
  const location = useLocation()

  // I know it's redundant
  if (isToBeReleased) {
    return (
      <Flex
        px={2}
        py={4}
        color={colors.white}
        pos="relative"
        justify="space-between"
        fontSize={{ base: 'md', md: 'lg' }}
        cursor="not-allowed"
        transition="all .1s ease-in-out"
      >
        <Text>{children}</Text>
        {isToBeReleased && (
          <Tag colorScheme="blue">
            <TagLabel>TBA</TagLabel>
          </Tag>
        )}
      </Flex>
    )
  }

  return (
    <Link to={{ pathname }} style={{ flex: 1 }} target={isExternal ? '_blank' : ''} {...props}>
      <Flex
        px={location.pathname === pathname ? 4 : 2}
        py={4}
        pos="relative"
        color={colors.white}
        justify="space-between"
        align="center"
        fontSize={{ base: 'md', md: '20px' }}
        fontWeight='bold'
        cursor="pointer"
        transition="all .1s ease-in-out"
        _hover={{ shadow: '8px 4px 0 rgb(253 213 72 / 15%)', bgGradient: `linear(to-l, ${colors.default}, ${colors.primary})`, color: 'white' }}
        _after={{
          display: location.pathname === pathname ? 'block' : 'none',
          content: "''",
          pos: 'absolute',
          width: '2px',
          height: '100%',
          bgColor: colors.secondary,
          top: 0,
          left: 0,
        }}
      >
        <Text>{children}</Text>
        {isExternal && <ExternalLinkIcon color="#fdd548" />}
      </Flex>
    </Link>
  )
}

export default SidebarLink
