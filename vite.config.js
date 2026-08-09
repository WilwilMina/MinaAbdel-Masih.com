import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

/*
  In production Vercel runs api/*.js as serverless functions, but `vite dev`
  knows nothing about them. This plugin mounts the same handler at the same
  path during development so `npm run dev` stays a single command — no
  `vercel dev` install, and no second copy of the logic to keep in sync.

  ssrLoadModule re-reads the handler per request, so edits to api/chat.js are
  picked up without restarting the server.
*/
function devApiPlugin(env) {
  return {
    name: 'dev-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        // Vite's dev server doesn't load .env into process.env for us.
        // Assign only when a value actually exists: process.env coerces to
        // string, so `??= undefined` would store the literal "undefined" and
        // defeat the handler's `||` fallback.
        for (const name of ['GEMINI_API_KEY', 'GEMINI_MODEL']) {
          if (env[name] && !process.env[name]) process.env[name] = env[name]
        }

        try {
          const mod = await server.ssrLoadModule('/api/chat.js')
          await mod.default(req, res)
        } catch (err) {
          server.ssrFixStacktrace(err)
          console.error('[dev-api] /api/chat failed:', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Dev API handler crashed — see terminal.' }))
        }
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), devApiPlugin(env)],
  }
})
