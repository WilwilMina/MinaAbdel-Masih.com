/*
  Footer — two-tier layout:
    Top tier — brand (logo + name + tagline) on the left; nav links, email,
               and social icons on the right.
    Divider, then a bottom bar — auto-updating copyright + "Built with" note.
  Includes a back-to-top button that smooth-scrolls to the top of the page.
*/
import './Footer.css'

function Footer() {
  const year = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="footer">
      <div className="footer-inner">
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to top">
          <i className="fa-solid fa-arrow-up"></i>
        </button>

        {/* Top tier */}
        <div className="footer-top">
          <div className="footer-brand">
            <img src="/images/logo-mark.png" className="footer-logo" alt="Mina Abdel-Masih logo" />
            <div>
              <div className="footer-name">Mina Abdel-Masih</div>
              <div className="footer-tagline">Computer Science @ NC State · AI &amp; Software Engineering</div>
            </div>
          </div>

          <a className="footer-email" href="mailto:minarouma@gmail.com">
            <i className="fa-solid fa-envelope"></i> minarouma@gmail.com
          </a>
        </div>

        <div className="footer-divider"></div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span>&copy; {year} Mina Abdel-Masih</span>
          <span className="footer-built">Built with React + Vite</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
