/*
  Hero — full-viewport landing section.
  Composes ParticleCanvas (background) + TypingText (animated role) and renders
  the chips, name, sub-intro, CTA buttons, and social links.
  Content fades up on mount via the .hero-content entrance animation in Hero.css.
*/
import TypingText from './TypingText.jsx'
import './Hero.css'

const CHIPS = [
  { icon: 'fa-solid fa-brain', label: 'AI Focus'   },
  { icon: 'fa-solid fa-robot', label: 'SWE'        },
  { icon: 'fa-solid fa-code',  label: 'Full-Stack' },
]

function Hero() {
  return (
    <section id="hero">
      <div className="hero-content">
        <div className="hero-chips">
          {CHIPS.map((chip) => (
            <span className="chip" key={chip.label}>
              <i className={chip.icon}></i> {chip.label}
            </span>
          ))}
        </div>

        <h1 className="glow-name">Mina Abdel-Masih.</h1>

        <h2 className="hero-role">
          I'm a <TypingText />
        </h2>

        <p className="sub-intro">
          Computer Science student at NC State. I build full-stack systems, explore AI,
          and write code that solves real problems.
        </p>

        <div className="hero-ctas">
          <a href="#projects" className="btn btn-primary">View My Work</a>
          <a href="/images/Minas_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
            <i className="fa-solid fa-file-arrow-down"></i> Resume
          </a>
        </div>

        <div className="hero-socials">
          <a
            href="https://www.linkedin.com/in/mina-abdel-masih-93a443217"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/WilwilMina"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
