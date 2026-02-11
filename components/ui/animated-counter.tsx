"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  end,
  suffix = "",
  decimals = 0,
  duration = 2000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true

    let start = 0
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [])

  return (
    <span className={className}>
      {count.toFixed(decimals)}{suffix}
    </span>
  )
}
