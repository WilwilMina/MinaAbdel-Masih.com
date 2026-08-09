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
  seeking: 'Summer 2027 software engineering internships',
  interests:
    'Full-stack development, applied AI, and building products that solve real problems.',
  email: 'minarouma@gmail.com',
  linkedin: 'https://www.linkedin.com/in/mina-abdel-masih-93a443217',
  github: 'https://github.com/WilwilMina',
  site: 'https://MinaAbdel-Masih.com',
}

/* Things the assistant gets asked that aren't project or skill facts. */
export const notes = [
  'Mina built this portfolio himself with React and Vite, designing the layout and animations. He used AI tools to move faster and polish details, and sees AI as a way to push good projects further.',
  'Some projects are university coursework, so their source code is private and available on request rather than on GitHub. The Access Control Compliance Engine and ugrep are both in that category.',
  'The best way to reach Mina is the contact form on this site, or email at minarouma@gmail.com.', 'Mina worked as a Pharmacy Customer Service Associate at Walgreens for four years, which taught him to work under pressure and strengthened his communication and customer-facing skills. He was recognized as one of the top performers in his region for credit card enrollments and was named Employee of the Month multiple times.', 'Mina interned as an Automation Developer at Zaki Technology, building an AI-driven workflow with N8N and the Gemini API to automate a manual data-entry process that had taken 2-3 hours a day, including a human-in-the-loop email classification and review system.',
]
