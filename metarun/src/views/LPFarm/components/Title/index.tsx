import React from 'react'
import { Heading } from '@chakra-ui/react'

const Title: React.FC<{ [x: string]: any }> = ({ children, ...props }) => (
  <Heading pb={2} borderBottom="3px solid #F3BA2F" color="white" size="lg" {...props}>
    {children}
  </Heading>
)

export default Title
