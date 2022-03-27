/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import { Heading } from '@chakra-ui/react'

const Title = ({ children, ...props }) => (
  <Heading pb={2} borderBottom="3px solid #F3BA2F" color="white" size="lg" {...props}>
    {children}
  </Heading>
)

export default Title
