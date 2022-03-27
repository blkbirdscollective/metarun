import React, { useState, useEffect, useRef } from 'react'

const NftMetaverse: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  function updateDimensions() {
    if (!boxRef.current) return
    setWidth(boxRef.current.clientWidth)
    setHeight(boxRef.current.clientHeight)
  }

  useEffect(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  return (
    <div style={{ flex: 1 }} ref={boxRef}>
      <iframe
        title="METARUN"
        src="https://www.cyber.xyz/METARUNmetaverse"
        width={width}
        height={height}
        seamless
        sandbox="allow-popups allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation"
      />
    </div>
  )
}

export default NftMetaverse
