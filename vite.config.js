import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' 让打包后的资源用相对路径，
// 这样部署到 GitHub Pages（https://z6xy.github.io/<仓库名>/）时能正常加载
export default defineConfig({
  base: './',
  plugins: [react()],
})
