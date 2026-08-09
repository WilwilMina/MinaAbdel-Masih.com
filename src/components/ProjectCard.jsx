/*
  ProjectCard — compact card for the Tier 2 "Other Projects" grid.
  Props: title, desc, image, alt, tags (string[]), github (URL or '#'),
         locked (bool — course project whose source stays private).
  Folder icon top-left; top-right is a GitHub link, or a lock linking to
  Contact when locked. A '#' github value renders a disabled placeholder.
*/
import './ProjectCard.css'

function ProjectCard({ title, desc, image, alt, tags, github, locked }) {
  const hasRepo = !locked && github && github !== '#'

  return (
    <article className="project-card">
      <div className="project-card-top">
        <i className="fa-solid fa-folder-open card-folder"></i>

        {locked ? (
          <a
            className="card-lock"
            href="#contact"
            aria-label={`${title} — source available on request, get in touch`}
            title="Source available on request"
          >
            <i className="fa-solid fa-lock"></i>
          </a>
        ) : hasRepo ? (
          <a
            className="card-github"
            href={github}
            aria-label={`View ${title} on GitHub`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        ) : (
          <span className="card-github disabled" aria-label="Repository coming soon" title="Coming soon">
            <i className="fa-brands fa-github"></i>
          </span>
        )}
      </div>

      <div className="project-card-media">
        <img src={image} alt={alt} loading="lazy" />
      </div>

      <h4 className="project-card-title">{title}</h4>
      <p className="project-card-desc">{desc}</p>

      <ul className="stack-tags">
        {tags.map((tag) => (
          <li className="tag" key={tag}>{tag}</li>
        ))}
      </ul>

      {/* Course projects: point recruiters at Contact rather than a dead link. */}
      {locked && (
        <a className="card-private-note" href="#contact">
          <i className="fa-solid fa-lock"></i>
          <span>Source available on request</span>
        </a>
      )}
    </article>
  )
}

export default ProjectCard
