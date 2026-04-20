"use client"

import React, { useEffect, useRef, ReactNode } from "react"

interface StatusSpotlightCardProps {
  children: ReactNode
  status: "success" | "warning" | "danger" | "neutral"
  className?: string
}

const statusColorMap = {
  success: { color: "#22C55E" },
  warning: { color: "#F59E0B" },
  danger: { color: "#EF4444" },
  neutral: { color: "#06B6D4" },
}

export function StatusSpotlightCard({
  children,
  status,
  className = "",
}: StatusSpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handlePointer = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty("--x", `${x}px`)
      card.style.setProperty("--y", `${y}px`)
    }

    card.addEventListener("mousemove", handlePointer)
    return () => card.removeEventListener("mousemove", handlePointer)
  }, [])

  const { color } = statusColorMap[status]

  return (
    <div 
      ref={cardRef} 
      className={`relative ${className}`}
      style={{
        "--glow-color": color,
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), ${color}00, transparent)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: `xor`,
          maskComposite: `exclude`,
          padding: "2px",
        }}
      >
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(200px circle at var(--x, 50%) var(--y, 50%), ${color}80, transparent 70%)`
          }}
        />
      </div>
      {children}
    </div>
  )
}
