import React from 'react'
import { Heading } from '@chakra-ui/react'
import { colors } from 'components/Colors'

interface SectionSubTitleProps {
  children: React.ReactNode
  [x: string]: any
}

const SectionSubTitle: React.FC<SectionSubTitleProps> = ({ children, ...props }) => {
  return (
    <Heading
      display="inline-block"
      color="#FFF"
      pos="relative"
      size="lg"
      _before={{
        content: "''",
        pos: 'absolute',
        bottom: -2,
        left: 0,
        width: '20%',
        height: '3px',
        bg: colors.primary,
      }}
      {...props}
    >
      {children}
    </Heading>
  )
}

export default SectionSubTitle
