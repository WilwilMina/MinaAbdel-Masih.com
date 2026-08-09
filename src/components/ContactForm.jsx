/*
  ContactForm — "Get In Touch" section.
  Starts as a centered intro (eyebrow + heading + "Contact Me" button).
  Clicking the button reveals the contact content inline: message form
  (left) + email/phone/socials/resume (right). The form POSTs to a Google
  Apps Script endpoint which appends the submission to a Google Sheet.
  Note: scriptURL is a public form-submission endpoint, not a secret key.
*/
import { useState } from 'react'
import './ContactForm.css'

const scriptURL =
  'https://script.google.com/macros/s/AKfycbwek2sckAfbY1mPk9X_K2Upc53cqIP84kW11nxAwUiqjQXoxwU2dDmU4ru1HiPDpDdL/exec'

function ContactForm() {
  const [revealed, setRevealed] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    setStatus('Sending... ⏳')

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        setStatus('Message sent successfully ✅')
        form.reset()
        setTimeout(() => setStatus(''), 2500)
      })
      .catch((error) => {
        console.error('Contact form error:', error.message)
        setStatus('Something went wrong — please email me directly.')
      })
  }

  return (
    <section id="contact">
      <div className="section-inner contact-inner">
        {/* Centered intro */}
        <div className="contact-intro">
          <span className="eyebrow">What's Next?</span>
          <h2 className="section-title">Get In Touch</h2>
          <button
            className="btn btn-primary contact-reveal-btn"
            onClick={() => setRevealed((v) => !v)}
            aria-expanded={revealed}
          >
            {revealed ? (
              <><i className="fa-solid fa-chevron-up"></i> Collapse</>
            ) : (
              <><i className="fa-solid fa-envelope"></i> Contact Me</>
            )}
          </button>
        </div>

        {/* Revealed content */}
        {revealed && (
          <div className="contact-reveal">
            {/* Left: details + socials + resume */}
            <div className="contact-left">
              <div className="contact-details">
                <p>
                  <i className="fa-solid fa-paper-plane"></i>
                  <a href="mailto:minarouma@gmail.com">minarouma@gmail.com</a>
                </p>
                <p>
                  <i className="fa-solid fa-square-phone"></i>
                  <a href="tel:9842989201">984-298-9201</a>
                </p>
              </div>

              <div className="social-icons contact-socials">
                <a
                  href="https://www.linkedin.com/in/mina-abdel-masih-93a443217"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="fa-brands fa-linkedin"></i>
                </a>
                <a
                  href="https://github.com/WilwilMina"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </div>

              <a href="/images/Minas_Resume.pdf" download className="btn btn-outline contact-resume">
                <i className="fa-solid fa-file-arrow-down"></i> Download Resume
              </a>
            </div>

            {/* Right: message form */}
            <div className="contact-right">
              <form className="contact-form" name="submit-to-google-sheet" onSubmit={handleSubmit}>
                <input type="text" name="Name" placeholder="Your Name" required />
                <input type="email" name="Email" placeholder="Your Email" required />
                <textarea name="Message" rows="6" placeholder="Your Message"></textarea>
                <button type="submit" className="btn btn-primary">Send Message ✉️</button>
              </form>
              <span className="contact-status">{status}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default ContactForm
