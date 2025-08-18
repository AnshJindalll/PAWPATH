"use client"

import { useEffect, useState } from "react"

export function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">🐕</div>
        <div className="loading-text">PawPath</div>
        <div className="loading-spinner"></div>
      </div>
    </div>
  )
}
