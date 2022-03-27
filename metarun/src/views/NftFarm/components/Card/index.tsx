import React from 'react'
import MotionBox from '../MotionBox'

const Card: React.FC<{ children: React.ReactNode; [x: string]: any }> = ({ children, ...props }) => (
  <MotionBox display="flex" flexDirection="column" p={8} rounded="5px" bg="#131215" shadow="md" {...props}>
    {children}
  </MotionBox>
)

export default Card
