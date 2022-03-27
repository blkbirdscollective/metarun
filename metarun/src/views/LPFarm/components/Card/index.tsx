import React from 'react'
import MotionBox from '../MotionBox'

const Card: React.FC<{ children: React.ReactNode; [x: string]: any }> = ({ children, ...props }) => (
  <MotionBox p={8} rounded="5px" bg="#131215" shadow="md" minW={{ base: 'auto', md: '300px', lg: '380px' }} {...props}>
    {children}
  </MotionBox>
)

export default Card
