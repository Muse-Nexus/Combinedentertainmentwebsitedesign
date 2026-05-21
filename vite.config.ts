import { defineConfig, type Plugin } from 'vite'
import path from 'path'
import fs from 'fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// ── Dev-only media browser/upload API ────────────────────────────────────
// GET  /api/media-list  → recursive listing of files under public/media/
// POST /api/upload      → JSON { filename, dataBase64 }; saves to public/media/uploads/
function mediaApiPlugin(): Plugin {
  const PUBLIC_MEDIA = path.resolve(__dirname, 'public/media')
  const UPLOAD_DIR = path.resolve(PUBLIC_MEDIA, 'uploads')
  const IMG_EXT = /\.(png|jpe?g|gif|webp|avif|svg)$/i

  function walk(dir: string, base = ''): string[] {
    if (!fs.existsSync(dir)) return []
    const out: string[] = []
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.')) continue
      const rel = base ? `${base}/${entry.name}` : entry.name
      const full = path.join(dir, entry.name)
      if (entry.isDirectory()) out.push(...walk(full, rel))
      else if (IMG_EXT.test(entry.name)) out.push(`/media/${rel}`)
    }
    return out
  }

  return {
    name: 'media-api',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/media-list', (_req, res) => {
        try {
          const files = walk(PUBLIC_MEDIA).sort()
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ files }))
        } catch (e: any) {
          res.statusCode = 500
          res.end(JSON.stringify({ error: e.message }))
        }
      })

      server.middlewares.use('/api/upload', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end('POST only') }
        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', () => {
          try {
            const { filename, dataBase64 } = JSON.parse(body)
            if (!filename || !dataBase64) throw new Error('filename + dataBase64 required')
            const safe = String(filename).replace(/[^a-zA-Z0-9._-]/g, '_')
            const stamp = Date.now()
            const finalName = `${stamp}-${safe}`
            if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
            const buf = Buffer.from(dataBase64, 'base64')
            fs.writeFileSync(path.join(UPLOAD_DIR, finalName), buf)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ src: `/media/uploads/${finalName}` }))
          } catch (e: any) {
            res.statusCode = 400
            res.end(JSON.stringify({ error: e.message }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    mediaApiPlugin(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
