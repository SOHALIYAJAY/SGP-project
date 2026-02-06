"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  value: number
  duration?: number
  className?: string
}

export function AnimatedCounter({
  value,
  duration = 1000,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    if (start === end) return

    const incrementTime = Math.max(Math.floor(duration / end), 20)

    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)

    return () => clearInterval(timer)
  }, [value, duration])

  return <span className={className}>{count}</span>
}
