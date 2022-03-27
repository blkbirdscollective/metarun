/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Heading } from '@chakra-ui/react'

export default function Title({ children, ...props }) {
  return (
    <Heading
      display="inline-block"
      color='#fff'
      pos="relative"
      _before={{
        content: "''",
        pos: 'absolute',
        bottom: -2,
        left: 0,
        width: '20%',
        height: '3px',
        bg: '#fff',
      }}
      {...props}
    >
      {children}
    </Heading>
  )
}
