/* Source of truth for all skills data — consumed by SkillsSection.jsx

   `texture` is the logo decal applied to the 3D ball; `icon` is the Font
   Awesome glyph used by the flat-pill fallback (mobile / reduced-motion).
   Logos live in public/tech/ as transparent PNGs.

   A skill with no `texture` is rendered as a pill even on desktop — per Mina,
   a technology without its real logo does not get a ball.

   Order matters: the ball grid fills left-to-right, 4 per row, so this list is
   grouped to keep related tech on the same row —
     row 1  core languages          row 2  the web trio + React
     row 3  version control + editors    row 4  tooling
     row 5  productivity (partial row, centred) */

export const stack = [
  { icon: 'fa-brands fa-java',     label: 'Java',   texture: '/tech/java.png'   },
  { icon: 'fa-solid fa-c',         label: 'C',      texture: '/tech/c.png'      },
  { icon: 'fa-brands fa-python',   label: 'Python', texture: '/tech/python.png' },
  { icon: 'fa-solid fa-file-code', label: 'LaTeX',  texture: '/tech/latex.png'  },

  { icon: 'fa-brands fa-html5',    label: 'HTML',       texture: '/tech/html.png'       },
  { icon: 'fa-brands fa-css3-alt', label: 'CSS',        texture: '/tech/css.png'        },
  { icon: 'fa-brands fa-js',       label: 'JavaScript', texture: '/tech/js.png'         },
  { icon: 'fa-brands fa-react',    label: 'React.js',   texture: '/tech/react.png'      },

  { icon: 'fa-brands fa-git-alt',   label: 'Git',     texture: '/tech/git.png'     },
  { icon: 'fa-brands fa-github',    label: 'GitHub',  texture: '/tech/github.png'  },
  { icon: 'fa-solid fa-code',       label: 'VSCode',  texture: '/tech/vscode.png'  },
  { icon: 'fa-solid fa-circle-dot', label: 'Eclipse', texture: '/tech/eclipse.png' },

  { icon: 'fa-solid fa-terminal',    label: 'Claude Code', texture: '/tech/claudecode.png' },
  { icon: 'fa-solid fa-paper-plane', label: 'Postman',     texture: '/tech/postman.png'    },
  { icon: 'fa-brands fa-jenkins',    label: 'Jenkins',     texture: '/tech/jenkins.png'    },
  { icon: 'fa-solid fa-sitemap',     label: 'N8N',         texture: '/tech/n8n.png'        },

  { icon: 'fa-brands fa-google',    label: 'Google Workspace', texture: '/tech/googleworkspace.png' },
  { icon: 'fa-brands fa-microsoft', label: 'Microsoft Office', texture: '/tech/office.png'          },
]

export const certifications = [
  { label: 'ChatGPT Prompt Engineering for Developers'  },
  { label: 'IBM Unleashing The Power of AI Agents'      },
]
