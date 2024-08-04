export default defineNuxtConfig({
  modules: ['../src/module'],

  laravel: {
    baseUrl: 'http://localhost:8000',
    CSRFurl: '/sanctum/csrf-cookie',
    cookieToken: 'XSRF-TOKEN',
    requestToken: 'X-XSRF-TOKEN',
    authProviders: {
      authGoogleUrl: '/auth/google',
    },
  },

  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  compatibilityDate: '2024-08-01',
})
