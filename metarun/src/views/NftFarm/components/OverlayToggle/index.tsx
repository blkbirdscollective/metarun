import React from 'react'
import { motion } from 'framer-motion'

import Path from '../Path'

const OverlayToggle: React.FC<{ onToggle: () => void }> = ({ onToggle }) => (
  <motion.button
    style={{
      position: 'absolute',
      top: '35px',
      right: '35px',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      userSelect: 'none',
      border: 'none',
      outline: 'none',
      zIndex: 1000,
      transform: 'scale(1)',
    }}
    onClick={onToggle}
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </motion.button>
)

export default OverlayToggle
