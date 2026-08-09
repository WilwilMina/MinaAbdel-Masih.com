/*
  ProjectsSection — two tiers, both driven by data/projects.js:
    Tier 1 (featured): large alternating image/content rows with a GitHub
      hover overlay on the image plus an always-visible GitHub link below.
    Tier 2 (other): compact card grid rendered via <ProjectCard />.
  Section + Tier 1 styles live in Projects.css; card styles in ProjectCard.css.
*/
import { tier1, tier2 } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import './Projects.css'

function FeaturedProject({ project }) {
  const hasRepo = project.github && project.github !== '#'

  return (
    <article className={`project ${project.reverse ? 'project--reverse' : ''}`}>
      <div className="project-media">
        <img src={project.image} alt={project.alt} loading="lazy" />
        <div className="project-overlay">
          {hasRepo ? (
            <a
              href={project.github}
              className="overlay-btn"
              aria-label={`View ${project.title} on GitHub`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          ) : (
            <span className="overlay-btn disabled" title="Coming soon" aria-label="Repository coming soon">
              <i className="fa-brands fa-github"></i>
            </span>
          )}
        </div>
      </div>

      <div className="project-content">
        <span className="project-kicker">{project.kicker}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>

        <ul className="stack-tags">
          {project.tags.map((tag) => (
            <li className="tag" key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="section-frosted">
      <div className="section-inner">
        <div className="projects-intro">
          <span className="eyebrow">My Work</span>
          <h2 className="section-title">
            Featured <span className="accent-text">Projects</span>
          </h2>
          <p className="projects-subtitle">
            A selection of my work — blending code, creativity, and problem-solving
            into real-world solutions.
          </p>
        </div>

        {/* Tier 1 — featured alternating layout */}
        {tier1.map((project) => (
          <FeaturedProject key={project.id} project={project} />
        ))}

        {/* Tier 2 — other projects card grid */}
        <div className="tier2-intro">
          <h3 className="tier2-heading">Other Projects</h3>
        </div>

        <div className="project-grid">
          {tier2.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              desc={project.desc}
              image={project.image}
              alt={project.alt}
              tags={project.tags}
              github={project.github}
              locked={project.locked}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
