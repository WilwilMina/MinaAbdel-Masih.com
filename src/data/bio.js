/* Facts about Mina that don't live in projects.js or skills.js.
   Consumed only by api/chat.js to ground the assistant — nothing here is
   rendered. Every line must be true and already public on the site; the
   assistant is instructed never to state anything outside this context. */

export const bio = {
  name: 'Mina Abdel-Masih',
  school: 'North Carolina State University',
  degree: 'B.S. Computer Science, Artificial Intelligence concentration',
  minor: 'Mathematics',
  gpa: '4.0 / 4.0',
  standing: 'Ranked #1 in his Computer Science class',
  graduation: 'May 2028',
  location: 'Raleigh, NC',
  seeking: 'Summer 2027 software engineering internships',
  interests:
    'Full-stack development, applied AI, and building products that solve real problems.',
  email: 'minarouma@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mina-abdel-masih-93a443217',
  github: 'https://github.com/WilwilMina',
  site: 'https://MinaAbdel-Masih.com',
}

/* Work history, most relevant first. Structured rather than prose so the
   assistant can cite one specific accomplishment instead of quoting a
   paragraph. This is the evidence it reaches for on "why should we hire him"
   questions, so entries describe what was built or done — not adjectives.
   `duration` is optional; omit it rather than guess. */
export const experience = [
  {
    role: 'Automation Developer Intern',
    org: 'Zaki Technology',
    work: [
      'Built an AI-driven workflow with N8N and the Gemini API that automated a manual data-entry process previously taking 2-3 hours a day.',
      'Designed a human-in-the-loop email classification and review system, so a person still approves what the automation proposes.',
    ],
  },
  {
    role: 'Pharmacy Customer Service Associate',
    org: 'Walgreens',
    duration: '4 years',
    work: [
      'Handled a high-pressure customer-facing pharmacy counter; the source of his composure and communication under pressure.',
      'Top regional performer for credit card enrollments; Employee of the Month multiple times.',
    ],
  },
]

/* Things the assistant gets asked that aren't project, skill, or job facts. */
export const notes = [
  'Mina built this portfolio himself with React and Vite, designing the layout and animations. He used AI tools to move faster and polish details, and sees AI as a way to push good projects further.',
  'Some university coursework has private source, available on request rather than on GitHub — the Access Control Compliance Engine and ugrep are both in that category.',
  'Best way to reach him: the contact form on this site, or minarouma@gmail.com.',
]
