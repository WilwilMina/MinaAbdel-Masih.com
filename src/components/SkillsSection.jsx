/*
  SkillsSection — one combined stack ("languages, technologies and tools")
  plus Certifications.
  Skills with a logo render as 3D balls (SkillsCanvas, lazy-loaded so three.js
  stays out of the initial bundle); skills without one stay as pills, since a
  technology without its real logo doesn't get a ball. Narrow screens and
  reduced-motion users get pills for everything — WebGL isn't worth the
  battery on a phone.
*/
import { Suspense, lazy, useEffect, useState } from 'react'
import { stack, certifications } from '../data/skills.js'
import './Skills.css'

const SkillsCanvas = lazy(() => import('./canvas/SkillsCanvas.jsx'))

const withLogos = stack.filter((s) => s.texture)
const withoutLogos = stack.filter((s) => !s.texture)

/* True only where the 3D version is actually a good idea. */
function useCanvasAllowed() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 700px)')
    const calm = window.matchMedia('(prefers-reduced-motion: no-preference)')
    const update = () => setAllowed(wide.matches && calm.matches)

    update()
    wide.addEventListener('change', update)
    calm.addEventListener('change', update)
    return () => {
      wide.removeEventListener('change', update)
      calm.removeEventListener('change', update)
    }
  }, [])

  return allowed
}

function SkillPills({ items }) {
  return (
    <div className="skills-grid">
      {items.map((skill) => (
        <div className="skill-pill" key={skill.label}>
          <i className={skill.icon}></i> {skill.label}
        </div>
      ))}
    </div>
  )
}

function SkillsSection() {
  const canvasAllowed = useCanvasAllowed()

  return (
    <section id="skills">
      <div className="section-inner skills-inner">
        <span className="eyebrow">Tech Stack</span>
        <h2 className="section-title">Skills &amp; Tools</h2>
        <p className="skills-subtitle">
          Some of the languages, technologies, and tools I build with.
        </p>

        {canvasAllowed ? (
          <>
            <Suspense fallback={<SkillPills items={withLogos} />}>
              <SkillsCanvas items={withLogos} columns={4} />
            </Suspense>
            {withoutLogos.length > 0 && <SkillPills items={withoutLogos} />}
          </>
        ) : (
          <SkillPills items={stack} />
        )}

        {/* Certifications */}
        <div className="skills-category">
          <h3 className="skills-category-label">Certifications</h3>
          <div className="cert-cards">
            {certifications.map((cert) => (
              <div className="cert-card" key={cert.label}>
                <i className="fa-solid fa-certificate"></i>
                <span>{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
