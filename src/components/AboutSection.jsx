/*
  AboutSection — two columns: headline + bio + stats + honours + interests on
  the left, sticky portrait with a floating fact card on the right.

  All copy lives in data/about.js; this file is layout only. Per-item accent
  colours arrive as the `--tint` custom property so stat cards and interest
  pills can each carry their own colour without a class apiece.

  Stacks to one column (photo on top) below 900px, where the floating card
  becomes a normal block — see About.css for why that matters.
*/
import { lead, stats, honors, interests, photoFacts } from '../data/about.js'
import './About.css'

function AboutSection() {
  return (
    <section id="about" className="section-frosted">
      <div className="section-inner about-inner">
        <div className="about-text">
          <span className="eyebrow">About Me</span>

          <h2 className="about-headline">
            Turning Curiosity
            <br />
            Into <span className="accent-text">Code.</span>
          </h2>

          <p className="about-lead">{lead}</p>

          <div className="about-stats">
            {stats.map((stat) => (
              <div
                className={`about-stat${stat.wide ? ' about-stat--wide' : ''}`}
                key={stat.label}
                style={{ '--tint': stat.tint }}
              >
                <span className="about-stat-icon">
                  <i className={stat.icon}></i>
                </span>
                <div className="about-stat-body">
                  <span className="about-stat-value">{stat.value}</span>
                  <span className="about-stat-label">{stat.label}</span>
                  {stat.detail && (
                    <span className="about-stat-detail">{stat.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="about-block">
            <h3 className="about-block-label">Honors &amp; Activities</h3>
            <ul className="about-honors">
              {honors.map((item) => (
                <li key={item.text}>
                  <i className={item.icon}></i>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="about-block">
            <h3 className="about-block-label">Beyond the Code</h3>
            <ul className="about-interests">
              {interests.map((item) => (
                <li key={item.label} style={{ '--tint': item.tint }}>
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about-photo">
          <img
            src="/images/minarouma@gmail.com-8c673407/minarouma@gmail.com-1.jpg"
            alt="Mina Abdel-Masih"
          />

          <div className="about-photo-card">
            {photoFacts.map((fact) => (
              <div className="about-photo-fact" key={fact.title}>
                {fact.dot ? (
                  <span className="about-photo-dot" aria-hidden="true"></span>
                ) : (
                  <i className={fact.icon}></i>
                )}
                <div>
                  <span className="about-photo-title">{fact.title}</span>
                  {fact.detail && (
                    <span className="about-photo-detail">{fact.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Decorative four-point sparkle, bottom-right of the frame. */}
          <svg className="about-sparkle" viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50 0 C54 34 66 46 100 50 C66 54 54 66 50 100 C46 66 34 54 0 50 C34 46 46 34 50 0 Z" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
