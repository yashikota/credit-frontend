import build from '@hono/vite-build/cloudflare-pages'
import devServer from '@hono/vite-dev-server'
import adapter from '@hono/vite-dev-server/cloudflare'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    build(),
    devServer({
      // adapter, // これを有効にすると Session secret is not provided というエラーが出る
      entry: 'src/index.tsx'
    })
  ]
})
