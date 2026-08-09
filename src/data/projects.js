/* Source of truth for all project data — consumed by ProjectsSection.jsx and ProjectCard.jsx */

export const tier1 = [
  {
    id: 'rooted',
    kicker: 'IBM × NCCU AI Hackathon',
    title: 'Rooted',
    desc: "A mental health journaling app that picks up on how you're feeling as you write, responds with prompts that fit your mood, and flags entries suggesting someone needs urgent help.",
    image: '/images/selfcare.png',
    alt: 'Rooted AI hackathon project',
    tags: ['Python', 'watsonx', 'LangChain', 'FastAPI', 'PostgreSQL', 'Docker', 'Redis', 'Streamlit'],
    github: 'https://github.com/WilwilMina/rooted',
  },
  {
    id: 'portfolio',
    kicker: 'Personal Project',
    title: 'MinaAbdel-Masih.com',
    desc: "This site. A personal portfolio bringing my projects, skills, and background together in one place — built from scratch and designed to read just as well on a phone as on a laptop.",
    image: '/images/website.png',
    alt: 'Personal portfolio website screenshot',
    tags: ['React', 'Vite', 'CSS'],
    github: 'https://github.com/WilwilMina/MinaAbdel-Masih.com',
    reverse: true,
  },
  {
    id: 'student-tool',
    kicker: 'Full-Stack Web App',
    title: 'Student Productivity Tool',
    desc: 'A study organizer that keeps your courses, assignments, and lecture notes in one place. Track deadlines on a calendar and watch your grades and GPA update automatically as you enter scores.',
    image: '/images/student.png',
    alt: 'Student Productivity Tool',
    tags: ['Java 21', 'Spring Boot', 'JUnit 5', 'React', 'REST API', 'FullCalendar'],
    github: 'https://github.com/WilwilMina/StudentProductivityTool',
  },
]

/* `locked: true` marks a course project whose source stays private — the card
   shows a lock that links to Contact instead of a GitHub link. */
export const tier2 = [
  {
    id: 'stress-test',
    title: 'Portfolio Stress Test',
    desc: 'Shows what would happen to your stock portfolio if the market turned against you. Add your holdings and it generates realistic crash and rally scenarios, then shows what each one would do to your money.',
    // Capital P matches the file on disk — Vercel's filesystem is case-sensitive.
    image: '/images/Portfolio.png',
    alt: 'Portfolio Stress Test dashboard',
    tags: ['React 19', 'Python', 'Flask', 'Gemini 2.5 Flash', 'yfinance', 'REST API'],
    github: 'https://github.com/ktobia/Portfolio-Performance-Analysis',
  },
  {
    id: 'ugrep',
    title: 'ugrep',
    desc: 'A command-line tool that searches files for text patterns and highlights every match, like the Unix grep command. Built entirely from scratch, including the pattern-matching engine itself.',
    image: '/images/ugrep.png',
    alt: 'ugrep matching output in a terminal',
    tags: ['C99', 'Regex Engine', 'Recursive Descent', 'Make'],
    locked: true,
  },
  {
    id: 'world-cup',
    title: 'FIFA World Cup 2026 Prediction Model',
    desc: 'An Elo rating model that predicted the 2026 World Cup using only matches played before the tournament began. It simulated the 48-team bracket 5,000 times and ranked both eventual finalists in its top two — Spain at 26.6%, Argentina at 20.4%.',
    image: '/images/fifamodel.png',
    alt: 'World Cup winner prediction model',
    tags: ['Python', 'Elo Rating', 'Monte Carlo'],
    github: 'https://github.com/WilwilMina/fifa-world-cup-2026-model',
  },
  {
    id: 'access-control',
    title: 'Access Control Compliance Engine',
    desc: "A tool for hospitals that reviews hundreds of thousands of medical-record access logs and flags anyone who opened a patient file they weren't supposed to.",
    image: '/images/AccessControlManager.png',
    alt: 'Access Control Compliance Engine',
    tags: ['Java', 'JUnit', 'CSV I/O', 'Custom Data Structures'],
    locked: true,
  },
]
