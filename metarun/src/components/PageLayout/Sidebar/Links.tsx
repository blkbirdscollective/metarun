import React from 'react'
import { Box } from '@chakra-ui/react'
import { colors } from 'components/Colors'

import SidebarGroup from './SidebarGroup'
import SidebarLinksContainer from './SidebarLinksContainer'
import SidebarLink from './SidebarLink'

const groups = [
  {
    title: 'Token',
    links: [
      // {
      //   isExternal: false,
      //   path: '/swap',
      //   name: 'Swap',
      //   toBeReleased: false,
      // },
      {
        isExternal: false,
        path: '/stake',
        name: 'Staking',
        toBeReleased: false,
      },
      // {
      //   isExternal: false,
      //   path: '/liquidity',
      //   name: 'Liquidity',
      //   toBeReleased: false,
      // },
      // {
      //   isExternal: false,
      //   path: '/lp-farm',
      //   name: 'Liquidity Farm',
      //   toBeReleased: false,
      // },
    ],
  },
  // {
  //   title: 'Games',
  //   links: [
  //     {
  //       isExternal: true,
  //       path: '',
  //       name: 'METARUN Safari',
  //       toBeReleased: true,
  //     },
  //   ],
  // },
  // {
  //   title: 'NFTs',
  //   links: [
  //     {
  //       isExternal: false,
  //       path: '/my-nfts',
  //       name: 'My NFTs',
  //       toBeReleased: false,
  //     },
  //     {
  //       isExternal: false,
  //       path: '',
  //       name: 'NFT Farm',
  //       toBeReleased: true,
  //     },
  //     {
  //       isExternal: false,
  //       path: '',
  //       name: 'NFT Staking',
  //       toBeReleased: true,
  //     },
  //     {
  //       isExternal: false,
  //       path: '',
  //       name: 'NFT Marketplace',
  //       toBeReleased: true,
  //     },
  //   ],
  // },
]

const Links: React.FC<{ [x: string]: any }> = ({ ...props }) => {
  return (
    <Box
      flex={1}
      mt={4}
      overflow="auto"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: colors.secondary,
          borderRadius: '24px',
        },
      }}
    >
      <Box p={4} w="100%" mx="auto" color="white" {...props}>
        {groups.map((group) => (
          <SidebarGroup title={group.title} key={group.title}>
            <SidebarLinksContainer>
              {group.links.map((link) => (
                <SidebarLink
                  isExternal={link.isExternal}
                  pathname={link.path}
                  isToBeReleased={link.toBeReleased}
                  key={link.name}
                >
                  {link.name}
                </SidebarLink>
              ))}
            </SidebarLinksContainer>
          </SidebarGroup>
        ))}
      </Box>
    </Box>
  )
}

export default Links
