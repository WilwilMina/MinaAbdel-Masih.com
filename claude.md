# CLAUDE.md — Portfolio Redesign Instructions (v2)

## Who This Is For

This is Mina Abdel-Masih's personal portfolio website: MinaAbdel-Masih.com.
Mina is a Computer Science student at NC State (AI Concentration, 4.0 GPA),
targeting Summer 2027 software engineering internships.

You are acting as Mina's development partner, not an autonomous coder.
Every phase below requires explicit approval before code is written.

---

## The Three Non-Negotiable Rules

1. **Preserve, then update.** Every feature currently on the site must keep
   working. Content (projects, skills) gets refreshed from the resume —
   nothing gets silently deleted.
2. **Same sections, new feel.** The page structure (Hero → About → Skills →
   Projects → Contact → Chatbot) stays. The visual execution should look
   noticeably more professional, with smoother/more deliberate animations.
3. **Plan before you code.** Never jump straight to implementation. Propose
   a plan, wait for explicit approval, then implement only what was approved.
   No silent extra changes "while you're in there."

If you (Claude Code) are ever unsure whether something requires approval,
default to asking. Asking too much is never the failure mode here —
unapproved changes are.

---

## Tech Stack

## Tech Stack

React + Vite. No TypeScript unless explicitly requested later.
CSS Modules or plain per-component CSS files (not Tailwind, not styled-
components) — keep styling readable and explicit.
Deploys to Vercel (auto-detects Vite build, runs `npm run build`, serves
the `/dist` output). Custom domain: MinaAbdel-Masih.com.
---

## Current Site — Features That MUST Be Preserved

These exist today and must still work after the redesign:

- Sticky nav with frosted-glass-on-scroll + mobile hamburger menu
- Hero section: particle canvas background, typing animation, chip badges,
  CTA buttons (View Projects / Resume), social links
- About section: bio text, profile photo, academic meta facts
- Skills section: language pills, tool pills, certification cards
- Projects section: Tier 1 alternating featured layout + Tier 2 card grid,
  GitHub hover overlay (image hover reveals GitHub icon button), always-
  visible GitHub link below each description for mobile
- Documents section: Resume + Transcript download buttons (correct,
  case-correct relative file paths)
- Contact section: contact form wired to a Google Apps Script endpoint
  (Google Sheets backend), email/phone, social icons
- Footer: copyright, nav links, social icons
- Floating chat widget (FAQ-style, no external API, all Q&A defined
  client-side) — must stay fully functional, just restyled

Do not remove or break any of the above without Mina explicitly asking.

---

## Content Rules

- Use the resume (provided as a PDF) as the source of truth for skills,
  projects, and work experience. The current site's content is the
  starting point, not the ceiling — update it to match the resume.
- Do not invent companies, awards, certifications, or experience not on
  the resume or already on the site.
- Avoid generic phrases ("passionate about," "hardworking," "love
  technology") — rewrite into something specific and confident instead.
- Keep descriptions accurate. Mina has flagged that the "Rooted" hackathon
  project was AI-assisted and should not be overstated in technical depth.

### Known content updates to apply (confirm with Mina before finalizing wording)

**Skills to add/update from resume:**
Java, C, Python, JavaScript, HTML/CSS, LaTeX, Git/GitHub, React.js,
 VSCode, Eclipse, Claude Code, Docker,
FastAPI (where relevant to a project), Google Workspace.

**Projects to include (pull current descriptions from resume, do not
invent details beyond what's written):**
1. Access Control Compliance Engine (Java, JUnit, CSV I/O, Custom Data
   Structures) — 262,000+ record compliance tool
2. Rooted (IBM x NCCU AI Hackathon — watsonx, LangChain, FastAPI, Python,
   PostgreSQL, Docker, Redis, Streamlit)
3. World Cup Winner Prediction Model (Python, Scikit-learn — ML pipeline)
4. Information Security Research (HTML, CSS, JS — research showcase site)
5. MinaAbdel-Masih.com (this portfolio itself — HTML, CSS, JS)
6. Any smaller/older projects (Wordle clone, Connect Four, PPM processor)
   can stay in a "More Projects" tier if there's no full write-up yet.

GitHub links: use real URLs where Mina has provided them. If a repo isn't
public yet, use `href="#"` with a `<!-- TODO: add GitHub URL -->` comment.
Never invent a fake link.

---

## Visual Direction

- Keep a dark theme as the base (this is already Mina's brand identity).
- Branch into an **original color palette** — do not copy a reference
  site's exact colors. Propose 2–3 palette directions during planning and
  let Mina choose.
- "More professional" means: better spacing/rhythm, more deliberate
  typography hierarchy, cleaner card design, more polished micro-
  interactions — not necessarily more decoration.
- "Better animations" means smoother, more purposeful motion (entrance
  transitions, hover states, scroll reveals) — not more animations for
  their own sake. Avoid anything that feels gimmicky or hurts performance.
- Mina will provide reference screenshots for layout/style inspiration.
  Adapt, don't clone. Always check: "does this still look like Mina's
  site, or does it look like someone else's site with Mina's name on it?"

---

## Required Workflow (applies to every phase)

For every phase, follow this loop exactly:

1. **Propose.** Explain what you're about to plan/change, referencing
   which files and sections are involved.
2. **Wait.** Do not write implementation code until Mina responds with
   explicit approval (e.g. "approved," "go ahead," "yes start").
3. **Implement only what was approved.** If you notice something else
   worth fixing along the way, flag it as a suggestion for a future phase
   — do not fix it inline without asking.
4. **Summarize.** After implementing, list exactly what changed, what
   still needs attention, and any new TODOs.

If a single phase would require touching many unrelated files or sections,
stop and ask whether to split it into smaller phases instead.

---

## Suggested Phases

### Phase 0 — Resume Sync Check
Read the resume PDF. Produce a side-by-side list: current site content
vs. resume content, for Skills and Projects. Flag what's missing, what's
outdated, what's accurate. **No code. No file edits.** Just the comparison,
for Mina to confirm before anything else happens.

### Phase 1 — Audit (if not already done)
Review current HTML/CSS/JS. List existing features, broken links,
security concerns, and design weaknesses. No code yet.

### Phase 2 — Visual Direction Plan
Based on reference screenshots Mina provides:
- Propose 2–3 color palette directions
- Propose layout/spacing adjustments per section (Nav, Hero, About,
  Skills, Projects, Documents, Contact, Footer, Chat widget)
- Propose animation/micro-interaction ideas per section
- Get Mina's explicit choice on palette + layout direction before moving on

### Phase 3 — Content Update Plan
Using the Phase 0 comparison, propose the exact new copy for:
- Updated Skills section (pills/badges)
- Updated/new Projects (titles, descriptions, tags, GitHub links)
Wait for approval on wording before writing any HTML.

### Phase 4 — Structure & Styling Implementation
Implement the approved Phase 2 + Phase 3 plan into HTML/CSS. One section
at a time. Confirm each section looks right before moving to the next.

### Phase 5 — Animation Pass
Add the approved micro-interactions/animations. Test that nothing breaks
existing functionality (typing animation, particle canvas, chat widget,
contact form).

### Phase 6 — Feature Verification
Go through every item in "Features That MUST Be Preserved" above and
confirm each one still works after all changes.

### Phase 7 — Responsive & Final QA
Check mobile (375px), tablet, and desktop (1440px). Check console errors,
broken links, download buttons, chat widget, contact form submission.

### Phase 8 - Contact Me
I want the bottom section to say want to contact me or like a contact me button and then once they click it, it pop ups this screen to get in touch

The bottom is too repetitive, remove the bottom home, about, projects, contact and my linked in and github because it already says it on the lets connect

### Phase 9 - Descriptions
I want my job descriptions of the project to say what it does simply. I'll give you several examples:

1. MixMatch
A music-based social networking application that allows users to see what their friends are listening to and get song recommendations based on popular music within a user's network

2. Todoist Clone
A fully-functional Todoist clone mobile application for task management using projects. Create tasks, sort tasks into projects, add due dates and track tasks using the various task views.

3. Personal Portfolio
A personal portfolio built using React and styled with Tailwind CSS, drawing inspiration from the stunning portfolio designed by Noor Mohammad. This project showcases my skills, experiences, and projects in a visually appealing and interactive manner.

it simply just states what it is and does not give the recruiter a headache, they can check out the coode if they want
### Phase 10 - 3D Models
I want all my languages and technologies & tools to be like 3d models, ill show you pictures of it 
### Phase 11: ChatBot
I think we should keep the pre-written responses on the chat and then have an extra feature that says like "ask other questions" on the bottom and then thats where it accesses the model

Preferrably the google gemini model or the cheapest model.


---

## Security Reminders

- Never expose API keys or credentials in frontend code. If found, flag
  it, replace with a placeholder + comment, and recommend a backend/
  serverless proxy. Do not repeat the secret value in your response.
- The Google Apps Script form endpoint is a public form-submission URL,
  not a private key — note it but it is not a critical issue on its own.

---

## Response Format

For every response in this project, structure it as:

**What I found / What I'm proposing**
**Files/sections involved**
**Waiting on your approval for:** (be explicit about what needs a yes)
**Code** (only after approval, only for the approved scope)
**Next step**

## File Organization

One component = one `.jsx` + one matching `.css` file, same name,
same folder. Example:

/src
  /components
    Nav.jsx          Nav.css
    Hero.jsx         Hero.css
    TypingText.jsx   TypingText.css
    ParticleCanvas.jsx
    AboutSection.jsx About.css
    SkillsSection.jsx Skills.css
    ProjectCard.jsx  ProjectCard.css
    ProjectsSection.jsx
    DocumentsSection.jsx Documents.css
    ContactForm.jsx  ContactForm.css
    Footer.jsx       Footer.css
    ChatWidget.jsx   ChatWidget.css
  /data
    projects.js      ← project content as data, not hardcoded JSX
    skills.js
  App.jsx
  App.css
  main.jsx

Every .jsx file starts with a short comment block: what the component
renders, what props (if any) it takes, and what it's responsible for.
Do not put unrelated logic in a component file — if a component grows
past ~150 lines, suggest splitting it (and ask before doing so).

## Reminder

Reference my resume pdf to add information

Do not finish the redesign in one response. Do not skip the planning step
for any phase. Treat this as a back-and-forth collaboration, not a
one-shot generation task.