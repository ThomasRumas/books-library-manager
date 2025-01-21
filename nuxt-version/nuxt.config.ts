// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@prisma/nuxt', '@nuxt/eslint'],
  experimental: {
    componentIslands: true,
  },
  css: ['@/assets/scss/global.scss'],
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  nitro: {
    compressPublicAssets: { gzip: true, brotli: false },
  }
});
