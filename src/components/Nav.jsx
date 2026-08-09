/*
  Nav — sticky navigation bar.
  - Starts transparent; gains a frosted-glass background once the user scrolls past 40px.
  - Desktop: inline nav links with a teal underline-on-hover.
  - Mobile (< 900px): hamburger button toggles a dropdown menu.
  No props. Self-contained scroll + menu state via hooks.
*/
import { useEffect, useState } from 'react'
import './Nav.css'

const LINKS = [
  { href: '#hero',     label: 'Home'     },
  { href: '#about',    label: 'About'    },
  { href: '#projects', label: 'Projects' },
  { href: '#contact',  label: 'Contact'  },
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState('hero')

  // Add the frosted-glass state once the page is scrolled past 40px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll() // sync on mount in case the page loads already scrolled
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy: highlight the nav link for whichever section is in view.
  // The rootMargin defines a band near the vertical middle of the viewport;
  // whichever observed section crosses it becomes "active".
  useEffect(() => {
    const sections = LINKS
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter(Boolean)
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav id="main-nav" className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <a href="#hero" className="nav-logo-link" onClick={closeMenu}>
          <img src="/images/logo-mark.png" className="logo" alt="Mina Abdel-Masih logo" />
        </a>

        {/* Desktop links — hidden below 900px via CSS */}
        <ul className="nav-links">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeId === link.href.slice(1) ? 'active' : ''}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hamburger — visible only on mobile */}
        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile dropdown — toggled by the hamburger */}
      <div className={`nav-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <ul>
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={activeId === link.href.slice(1) ? 'active' : ''}
                onClick={closeMenu}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Nav
