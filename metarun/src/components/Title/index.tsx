import React from 'react'
import { Heading, useColorModeValue } from '@chakra-ui/react'

const Title: React.FC<{ [x: string]: any }> = ({ children, ...props }) => {
  const color = useColorModeValue('black', 'white')

  return (
    <Heading pb={2} borderBottom="3px solid #F3BA2F" color={color} size="lg" {...props}>
      {children}
    </Heading>
  )
}

export default Title
