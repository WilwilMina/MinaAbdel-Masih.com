/*
  ParticleCanvas — calm white STARFIELD used as a fixed, full-page background
  behind every section (rendered once at the App level).
  - Scattered white stars of varying size + brightness that gently twinkle
    and drift slowly downward, wrapping around. No connecting lines.
  - Fills the viewport via position:fixed (#bg-canvas in App.css).
  - pointer-events:none, so it never blocks clicks.
  - Respects prefers-reduced-motion: renders a still starfield (no animation).
  - Cleans up its rAF loop + listeners on unmount.
*/
import { useEffect, useRef } from 'react'

// One star per this many CSS pixels of area (lower = denser). Capped by MAX_STARS.
const AREA_PER_STAR = 7000
const MAX_STARS = 280

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const dpr = Math.max(1, window.devicePixelRatio || 1)
    let w, h
    let rafId
    let stars = []

    const rand = (min, max) => Math.random() * (max - min) + min

    function makeStar() {
      return {
        x: rand(0, w),
        y: rand(0, h),
        r: rand(0.5, 1.8) * dpr,            // radius
        baseAlpha: rand(0.25, 1),            // brightness
        twinkleSpeed: rand(0.0006, 0.0022),  // how fast it pulses
        phase: rand(0, Math.PI * 2),         // twinkle offset
        vy: rand(0.02, 0.09) * dpr,          // slow downward drift
        glow: Math.random() < 0.12,          // a few stars get a soft halo
      }
    }

    function build() {
      const cssW = canvas.clientWidth
      const cssH = canvas.clientHeight
      const count = Math.min(MAX_STARS, Math.floor((cssW * cssH) / AREA_PER_STAR))
      stars = Array.from({ length: count }, makeStar)
    }

    function resize() {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      w = canvas.width
      h = canvas.height
      build()
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        // Gentle twinkle via a sine wave on alpha.
        const tw = 0.55 + 0.45 * Math.sin(now * s.twinkleSpeed + s.phase)
        const alpha = s.baseAlpha * tw

        // Drift slowly downward; wrap to the top when off-screen.
        s.y += s.vy
        if (s.y - s.r > h) {
          s.y = -s.r
          s.x = rand(0, w)
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        if (s.glow) {
          ctx.shadowBlur = 6 * dpr
          ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`
        } else {
          ctx.shadowBlur = 0
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.fill()
      }
      ctx.shadowBlur = 0

      rafId = requestAnimationFrame(draw)
    }

    function drawStill() {
      ctx.clearRect(0, 0, w, h)
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${s.baseAlpha})`
        ctx.fill()
      }
    }

    const onResize = () => {
      resize()
      if (prefersReduced) drawStill()
    }

    window.addEventListener('resize', onResize)
    resize()

    if (prefersReduced) {
      drawStill() // static starfield, no motion
    } else {
      rafId = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas id="bg-canvas" ref={canvasRef} aria-hidden="true"></canvas>
}

export default ParticleCanvas
