// https://nuxt.com/docs/api/configuration/nuxt-config
// Настройка alias для упрощения импортов
import {resolve} from 'path'
export default defineNuxtConfig({
  alias: {
    assets: "/<rootDir>/assets",
  },
  // Настройка пути к файлу стилей (SCSS)
  css: ["~/assets/main.scss"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@nuxt/image"],
  ssr: false
})