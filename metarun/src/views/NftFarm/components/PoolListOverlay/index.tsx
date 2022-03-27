import React from 'react'
import MotionBox from '../MotionBox'

const PoolListOverlay: React.FC<{ children: React.ReactNode; [x: string]: any }> = ({ children, ...props }) => {
  const overlay = {
    open: {
      clipPath: `circle(200% at calc(100% - 47px) 45px)`,
      transition: {
        type: 'spring',
        stiffness: 40,
      },
    },
    closed: {
      clipPath: 'circle(25px at calc(100% - 47px) 45px)',
      transition: {
        type: 'spring',
        delay: 0.2,
        stiffness: 400,
        damping: 40,
      },
    },
  }
  return (
    <MotionBox
      pos="absolute"
      top={0}
      left={0}
      w="100%"
      h="100%"
      bg="#F3BA2F"
      variants={overlay}
      zIndex={999}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default PoolListOverlay
