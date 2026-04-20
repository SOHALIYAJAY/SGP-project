"use client"

import React, { useEffect, useRef } from "react"

export default function HeroParticles() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia && window.matchMedia("(max-width: 640px)").matches) return // disable on small screens

    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    let dpr = Math.max(1, window.devicePixelRatio || 1)

    let width = 0
    let height = 0

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = Math.max(1, Math.floor(rect.width))
      height = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const PARTICLE_COUNT = 150 // many raindrops
    type P = { x: number; y: number; vx: number; vy: number; w: number; h: number; alpha: number; tilt: number }
    const particles: P[] = []

    function initParticles() {
      particles.length = 0
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * width
        const y = -Math.random() * height // start above the top so rain falls in from top
        const w = 0.3 + Math.random() * 1.0 // smaller, narrower
        const h = 3 + Math.random() * 8 // shorter elongated height
        const vy = 40 + Math.random() * 80 // slightly slower fall
        const vx = (Math.random() - 0.5) * 6
        const alpha = 0.05 + Math.random() * 0.10
        const tilt = (Math.random() - 0.5) * 0.25
        particles.push({ x, y, vx, vy, w, h, alpha, tilt })
      }
    }

    let last = performance.now()

    function draw(now: number) {
      const dt = Math.min(50, now - last) / 1000
      last = now

      ctx.clearRect(0, 0, width, height)

      for (let p of particles) {
        // update
        p.y += p.vy * dt
        p.x += p.vx * dt

        // respawn when off bottom
        if (p.y - p.h > height) {
          p.y = -10 - Math.random() * 60
          p.x = Math.random() * width
        }

        const a = p.alpha

        // draw smaller elongated white raindrop (ellipse rotated slightly)
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.tilt)
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${a})`
        ctx.shadowBlur = 4
        ctx.shadowColor = `rgba(255,255,255,${Math.min(1, a * 0.9)})`
        ctx.ellipse(0, 0, p.w, p.h, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // initialize
    resize()
    initParticles()
    rafRef.current = requestAnimationFrame(draw)

    const ro = new ResizeObserver(() => {
      dpr = Math.max(1, window.devicePixelRatio || 1)
      resize()
      initParticles()
    })
    ro.observe(canvas)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      aria-hidden
    />
  )
}
