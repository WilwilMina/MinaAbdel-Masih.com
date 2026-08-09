/*
  check-assets — verifies every /images/* and /tech/* reference in src/
  actually resolves to a file in public/.

  Why this exists: `vite dev` serves files from the project root as well as
  from public/, so a reference to a file that only exists in the old root
  images/ folder loads fine locally and 404s in production. Case is the other
  trap — Windows resolves /images/portfolio.png to Portfolio.png, Vercel's
  Linux filesystem does not. Both bugs are invisible until the site is live.

  Exits 1 on any broken reference so it can gate a build.
*/
import fs from 'node:fs'
import path from 'node:path'

const SRC = 'src'
const PUBLIC = 'public'
const REF_PATTERN = /['"(]\/((?:images|tech)\/[^'")\s]+)/g

function walk(dir, onFile) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, onFile)
    else onFile(full)
  }
}

// Every asset path referenced from source.
const refs = new Set()
walk(SRC, (file) => {
  if (!/\.(jsx?|css|html)$/.test(file)) return
  for (const m of fs.readFileSync(file, 'utf8').matchAll(REF_PATTERN)) refs.add(m[1])
})

// Every file actually present in public/, as forward-slash relative paths.
const present = new Set()
walk(PUBLIC, (file) => {
  present.add(path.relative(PUBLIC, file).split(path.sep).join('/'))
})

// Lowercase index lets us tell "wrong case" apart from "not there at all".
const byLower = new Map([...present].map((f) => [f.toLowerCase(), f]))

const problems = []
for (const ref of [...refs].sort()) {
  if (present.has(ref)) continue
  const actual = byLower.get(ref.toLowerCase())
  problems.push(
    actual
      ? `  CASE MISMATCH  /${ref}  →  file on disk is ${PUBLIC}/${actual}`
      : `  MISSING        /${ref}  (no such file in ${PUBLIC}/)`
  )
}

if (problems.length) {
  console.error(`\n${problems.length} broken asset reference(s):\n`)
  console.error(problems.join('\n'))
  console.error(`\n${refs.size} references checked.\n`)
  process.exit(1)
}

console.log(`${refs.size} asset references checked — all resolve in ${PUBLIC}/.`)
