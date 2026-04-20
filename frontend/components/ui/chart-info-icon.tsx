'use client'

import React, { useState } from 'react'

interface ChartInfoIconProps {
  tooltipText: string
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
}

export function ChartInfoIcon({ tooltipText, position = 'top-right' }: ChartInfoIconProps) {
  const [isHovered, setIsHovered] = useState(false)

  const positionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
  }

  const tooltipPositionClasses = {
    'top-right': 'bottom-full right-0 mb-2',
    'top-left': 'bottom-full left-0 mb-2',
    'bottom-right': 'top-full right-0 mt-2',
    'bottom-left': 'top-full left-0 mt-2',
  }

  return (
    <div
      className={`absolute ${positionClasses[position]} z-10`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 hover:from-cyan-500/30 hover:to-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 flex items-center justify-center transition-all duration-200 ease-out group"
        aria-label="Chart information"
      >
      </button>

      {/* Tooltip */}
      {isHovered && (
        <div
          className={`absolute ${tooltipPositionClasses[position]} bg-slate-900/95 border border-cyan-500/40 rounded-lg px-3 py-2 text-xs text-slate-200 whitespace-nowrap shadow-lg backdrop-blur-sm animate-fade-in z-50`}
        >
          {tooltipText}
          <div className={`absolute ${position.includes('top') ? 'bottom-0 translate-y-full' : 'top-0 -translate-y-full'} left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900/95 border-r border-b border-cyan-500/40 transform rotate-45`} />
        </div>
      )}
    </div>
  )
}
