/*
  SkillsCanvas — a single WebGL canvas holding every skill ball.
  Props: items ([{ label, texture }]), columns (number, default 4).

  Deliberately ONE <Canvas> for all balls. Giving each ball its own canvas —
  the common tutorial pattern — burns one WebGL context apiece; browsers cap
  live contexts around 8-16 and silently drop the oldest past that, so balls
  start vanishing. Interaction is still per-ball: see Ball.jsx, which rotates
  only the ball you grab. There is no OrbitControls, so the scene never tilts
  as a whole.

  The camera is orthographic, which makes `zoom` an exact pixels-per-world-unit
  figure. Grid spacing and the wrapper's height are derived from it, so the
  layout is predictable instead of guessed at through perspective.

  Rendering pauses (frameloop="never") whenever the section is off-screen.
*/
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Preload } from '@react-three/drei'
import Ball from './Ball.jsx'
import './SkillsCanvas.css'

const ZOOM = 45      // pixels per world unit
const GAP_X = 3.6    // world units between ball centres
const GAP_Y = 3.9

function SkillsCanvas({ items, columns = 4 }) {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(false)

  // Only render frames while the balls are actually on screen.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: '150px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const rows = Math.ceil(items.length / columns)

  return (
    <div
      className="skills-canvas"
      ref={wrapRef}
      style={{
        height: `${rows * GAP_Y * ZOOM}px`,
        maxWidth: `${columns * GAP_X * ZOOM}px`,
      }}
    >
      {/* `flat` disables R3F's default ACES filmic tone mapping, which was
          desaturating every logo decal — pale marks suffered most. */}
      <Canvas
        flat
        orthographic
        frameloop={active ? 'always' : 'never'}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 20], zoom: ZOOM }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.85} />
          <directionalLight position={[5, 6, 8]} intensity={2.1} />
          {/* Palette rim lights so the white facets still read as this site. */}
          <pointLight position={[-6, 2, 5]} intensity={1.1} decay={0} color="#2de2b6" />
          <pointLight position={[6, -4, 4]} intensity={0.9} decay={0} color="#7c6ff7" />

          {items.map((item, i) => {
            const col = i % columns
            const row = Math.floor(i / columns)
            // A partial final row is centred rather than left-aligned.
            const inRow = Math.min(columns, items.length - row * columns)
            return (
              <Ball
                key={item.label}
                label={item.label}
                texture={item.texture}
                position={[
                  (col - (inRow - 1) / 2) * GAP_X,
                  ((rows - 1) / 2 - row) * GAP_Y,
                  0,
                ]}
              />
            )
          })}

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default SkillsCanvas
