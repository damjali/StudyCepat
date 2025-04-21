"use client"

import { useEffect, useState, useRef } from "react"

export default function BackgroundAnimation() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update dimensions and scroll position
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    // Set initial dimensions and scroll position
    handleResize()
    handleScroll()

    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position
      const x = e.clientX
      const y = e.clientY + scrollPosition // Add scroll position to get absolute position
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [scrollPosition])

  useEffect(() => {
    if (backgroundRef.current && dimensions.width > 0) {
      // Create multiple gradient points that follow the cursor
      const gradientPoints = [
        {
          x: mousePosition.x / dimensions.width,
          y: mousePosition.y / document.body.scrollHeight,
          size: 0.4,
          opacity: 0.8,
          color: "rgba(214, 236, 255, 0.8)",
        },
        {
          x: (mousePosition.x - 100) / dimensions.width,
          y: (mousePosition.y - 100) / document.body.scrollHeight,
          size: 0.3,
          opacity: 0.6,
          color: "rgba(194, 232, 255, 0.9)",
        },
        {
          x: (mousePosition.x + 100) / dimensions.width,
          y: (mousePosition.y + 100) / document.body.scrollHeight,
          size: 0.5,
          opacity: 0.7,
          color: "rgba(180, 225, 255, 0.7)",
        },
      ]

      // Create a dynamic background with multiple radial gradients
      let backgroundStyle = "linear-gradient(180deg, rgba(214, 236, 255, 0.3) 0%, rgba(194, 232, 255, 0.5) 100%)"

      gradientPoints.forEach((point, index) => {
        // Ensure point coordinates are within bounds
        const x = Math.max(0, Math.min(1, point.x)) * 100
        const y = Math.max(0, Math.min(1, point.y)) * 100

        backgroundStyle += `, radial-gradient(circle at ${x}% ${y}%, ${point.color} 0%, rgba(194, 232, 255, 0) ${point.size * 100}%)`
      })

      backgroundRef.current.style.background = backgroundStyle
    }
  }, [mousePosition, dimensions, scrollPosition])

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 -z-10 transition-all duration-200 ease-out"
      style={{
        background: "linear-gradient(180deg, rgba(214, 236, 255, 0.8) 0%, rgba(194, 232, 255, 1) 100%)",
      }}
    />
  )
}
