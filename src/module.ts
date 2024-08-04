import { fileURLToPath } from 'node:url'
import { defu } from 'defu'
import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addImportsDir,
} from '@nuxt/kit'

interface ModuleOptions {
  /**
   * Laravel API URL
   * @default process.env.LARAVEL_URL
   * @example 'http://localhost:8000'
   * @type string
   */
  baseUrl: string

  /**
   * Laravel CSRF Cookie URL
   * @default '/sanctum/csrf-cookie'
   * @example '/custom/csrf-cookie'
   * @type string
   */
  CSRFurl?: string

  /**
   * Laravel Token Key returtned on requests
   * @default 'XSRF-TOKEN'
   * @example 'CUSTOM-TOKEN'
   * @type string
   */
  cookieToken?: string

  /**
   * Laravel Token Key used for requests
   * @default 'XSRF-TOKEN'
   * @example 'CUSTOM-TOKEN'
   * @type string
   */
  requestToken?: string

  /**
   * Laravel Auth URL (If using SSO for exmaple)
   * @default base_url
   * @example 'http://localhost:8000'
   * @type string
   */
  authBaseUrl?: string

  /**
   * Laravel Auth CSRF Cookie URL (If separate from the data app)
   * @default '/sanctum/csrf-cookie'
   * @example '/custom/csrf-cookie'
   * @type string
   */
  authCSRFurl?: string

  /**
   * Laravel Auth Token Key returtned on requests (If separate from the data app)
   * @default 'XSRF-TOKEN'
   * @example 'CUSTOM-TOKEN'
   * @type string
   */
  authCookieToken?: string

  /**
   * Laravel Auth Token Key used for requests (If separate from the data app)
   * @default 'XSRF-TOKEN'
   * @example 'CUSTOM-TOKEN'
   * @type string
   */
  authRequestToken?: string

  /**
   * Laravel Auth Login URL
   * @default '/login'
   * @example '/custom/login'
   * @type string
   */
  authLoginUrl: string

  /**
   * Laravel Auth Register URL
   * @default '/register'
   * @example '/custom/register'
   * @type string
   */
  authRegisterUrl: string

  /**
   * Laravel Auth Logout URL
   * @default '/logout'
   * @example '/custom/logout'
   * @type string
   */
  authLogoutUrl: string

  /**
   * Laravel Auth Forgot Password URL
   * @default '/forgot-password'
   * @example '/custom/forgot-password'
   * @type string
   */
  authForgotPasswordUrl: string

  /**
   * Laravel Auth Reset Password URL
   * @default '/reset-password'
   * @example '/custom/reset-password'
   * @type string
   */
  authResetPasswordUrl: string

  /**
   * Laravel Auth Verify URL
   * @default '/email/verify'
   * @example '/custom/email/verify'
   * @type string
   */
  authVerifyUrl: string

  authProviders?: {
    /**
     * Laravel Auth Google URL
     * @example '/api/oauth/google'
     * @type string
     */
    authGoogleUrl?: string

    /**
     * Laravel Auth Apple URL
     * @example '/api/oauth/apple'
     * @type string
     */
    authAppleUrl?: string

    /**
     * Laravel Auth Facebook URL
     * @example '/api/oauth/facebook'
     * @type string
     */
    authFacebookUrl?: string

    /**
     * Laravel Auth Twitter URL
     * @example '/api/oauth/twitter'
     * @type string
     */
    authTwitterUrl?: string

    /**
     * Laravel Auth LinkedIn URL
     * @example '/api/oauth/linkedin'
     * @type string
     */
    authLinkedinUrl?: string

    /**
     * Laravel Auth GitHub URL
     * @example '/api/oauth/github'
     * @type string
     */
    authGithubUrl?: string

    /**
     * Laravel Auth GitLab URL
     * @example '/api/oauth/gitlab'
     * @type string
     */
    authGitlabUrl?: string

    /**
     * Laravel Auth Bitbucket URL
     * @example '/api/oauth/bitbucket'
     * @type string
     */
    authBitbucketUrl?: string

    /**
     * Laravel Auth Slack URL
     * @example '/api/oauth/slack'
     * @type string
     */
    authSlackUrl?: string
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-laravel-auth',
    configKey: 'laravel',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    baseUrl: process.env.LARAVEL_BASE_URL || '',
    CSRFurl: process.env.LARAVEL_CSRF_URL || '/sanctum/csrf-cookie',
    cookieToken: process.env.LARAVEL_COOKIE_TOKEN || 'XSRF-TOKEN',
    requestToken: process.env.LARAVEL_REQUEST_TOKEN || 'X-XSRF-TOKEN',
    authBaseUrl: process.env.LARAVEL_AUTH_URL,
    authCSRFurl: process.env.LARAVEL_AUTH_CSRF_URL,
    authCookieToken: process.env.LARAVEL_AUTH_COOKIE_TOKEN,
    authRequestToken: process.env.LARAVEL_AUTH_REQUEST_TOKEN,
    authLoginUrl: process.env.LARAVEL_AUTH_LOGIN_URL || '/login',
    authRegisterUrl: process.env.LARAVEL_AUTH_REGISTER_URL || '/register',
    authLogoutUrl: process.env.LARAVEL_AUTH_LOGOUT_URL || '/logout',
    authForgotPasswordUrl:
      process.env.LARAVEL_AUTH_FORGOT_PASSWORD_URL || '/forgot-password',
    authResetPasswordUrl:
      process.env.LARAVEL_AUTH_RESET_PASSWORD_URL || '/reset-password',
    authVerifyUrl: process.env.LARAVEL_AUTH_VERIFY_URL || '/email/verify',
    authProviders: {
      authGoogleUrl: process.env.LARAVEL_AUTH_GOOGLE_URL || '',
      authAppleUrl: process.env.LARAVEL_AUTH_APPLE_URL || '',
      authFacebookUrl: process.env.LARAVEL_AUTH_FACEBOOK_URL || '',
      authTwitterUrl: process.env.LARAVEL_AUTH_TWITTER_URL || '',
      authLinkedinUrl: process.env.LARAVEL_AUTH_LINKEDIN_URL || '',
      authGithubUrl: process.env.LARAVEL_AUTH_GITHUB_URL || '',
      authGitlabUrl: process.env.LARAVEL_AUTH_GITLAB_URL || '',
      authBitbucketUrl: process.env.LARAVEL_AUTH_BITBUCKET_URL || '',
      authSlackUrl: process.env.LARAVEL_AUTH_SLACK_URL || '',
    },
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    nuxt.options.runtimeConfig.public.laravel = defu(
      nuxt.options.runtimeConfig.public.laravel,
      options
    )

    // Set default auth values if not set
    const authFields = [
      'authBaseUrl',
      'authCSRFurl',
      'authCookieToken',
      'authRequestToken',
    ] as const

    authFields.forEach((field) => {
      if (!nuxt.options.runtimeConfig.public.laravel[field]) {
        const baseFieldName = field.replace('auth', '')
        const firstLetterInBaseField = baseFieldName.charAt(0).toLowerCase()
        const remainingLettersInBaseField = baseFieldName.slice(1)
        const baseField = (firstLetterInBaseField +
          remainingLettersInBaseField) as keyof typeof options

        nuxt.options.runtimeConfig.public.laravel[field] =
          nuxt.options.runtimeConfig.public.laravel[baseField]
      }
    })

    // Ensure we have a Laravel URL
    if (!nuxt.options.runtimeConfig.public.laravel.baseUrl) {
      console.warn(
        'Missing laravel baseUrl, set it either in `nuxt.config.js` or via env variable'
      )
    }

    // Transpile runtime
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))
    nuxt.options.build.transpile.push(runtimeDir)

    // Run User plugin to set the user state on boot
    addPlugin(resolve('./runtime/plugins/user'))

    // Add composables
    addImportsDir(resolve('./runtime/composables'))
  },
})
