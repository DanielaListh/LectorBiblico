export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],

  components: {
    dirs: [
      '~/components',
    ]
  },

  css: [
    '~/assets/css/tailwind.css',
    'https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Aboreto&family=Bellefair&family=Cinzel:wght@400..900&family=Coiny&family=Corinthia:wght@400;700&family=Lexend+Exa:wght@100..900&display=swap'
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  }
})
