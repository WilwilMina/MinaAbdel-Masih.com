/*
  Ball — one faceted icosahedron carrying a technology logo as a surface decal,
  with a small static label underneath.
  Props: texture (image URL), label (string), position ([x, y, z]).

  Each ball spins on its own: dragging one rotates only that ball, never the
  scene. Pointer move/up are bound to the window so a drag keeps tracking even
  when the cursor leaves the ball.

  Renders inside the shared <Canvas> in SkillsCanvas.jsx — all balls share one
  WebGL context. The label sits outside <Float> so it stays put while the ball
  bobs.
*/
import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Decal, Float, Html, useTexture } from '@react-three/drei'

const DRAG_SPEED = 0.011
const EASING = 0.12

function Ball({ texture, label, position }) {
  const [decal] = useTexture([texture])
  const meshRef = useRef()
  const target = useRef({ x: 0, y: 0 })
  const dragging = useRef(false)
  const last = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return
      target.current.y += (e.clientX - last.current.x) * DRAG_SPEED
      target.current.x += (e.clientY - last.current.y) * DRAG_SPEED
      last.current = { x: e.clientX, y: e.clientY }
    }
    const onUp = () => {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ''
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [])

  // Ease toward the dragged angle so releasing doesn't stop it dead.
  useFrame(() => {
    const mesh = meshRef.current
    if (!mesh) return
    mesh.rotation.y += (target.current.y - mesh.rotation.y) * EASING
    mesh.rotation.x += (target.current.x - mesh.rotation.x) * EASING
  })

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh
          ref={meshRef}
          castShadow
          receiveShadow
          onPointerDown={(e) => {
            e.stopPropagation()
            dragging.current = true
            last.current = { x: e.clientX, y: e.clientY }
            document.body.style.cursor = 'grabbing'
          }}
          onPointerOver={() => {
            if (!dragging.current) document.body.style.cursor = 'grab'
          }}
          onPointerOut={() => {
            if (!dragging.current) document.body.style.cursor = ''
          }}
        >
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#f6f4ef"
            roughness={0.42}
            metalness={0.05}
            polygonOffset
            polygonOffsetFactor={-5}
            flatShading
          />
          {/* Bigger than the ball's "natural" decal size, and self-lit via
              emissiveMap so a pale logo still reads on an off-white ball
              instead of being dimmed by the scene lighting. */}
          <Decal position={[0, 0, 1]} rotation={[0, 0, 0]} scale={1.22}>
            <meshStandardMaterial
              map={decal}
              emissiveMap={decal}
              emissive="#ffffff"
              emissiveIntensity={0.38}
              roughness={0.5}
              metalness={0}
              transparent
              polygonOffset
              polygonOffsetFactor={-10}
              toneMapped={false}
            />
          </Decal>
        </mesh>
      </Float>

      <Html center position={[0, -1.75, 0]}>
        <span className="ball-label">{label}</span>
      </Html>
    </group>
  )
}

export default Ball
