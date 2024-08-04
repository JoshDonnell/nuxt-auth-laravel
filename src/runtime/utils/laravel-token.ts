import { useCookie, useRuntimeConfig } from 'nuxt/app'

export const getLaravelToken = async (type: 'request' | 'auth' = 'request') => {
  const config = useRuntimeConfig().public.laravel
  const requestUrl = type === 'auth' ? config.authBaseUrl : config.baseUrl
  const tokenUrl = type === 'auth' ? config.authCSRFurl : config.CSRFurl
  const tokenKey: string =
    type === 'auth' ? config.authCookieToken : config.cookieToken

  const laravelCSRFCookie = useCookie(tokenKey)
  if (laravelCSRFCookie.value) return laravelCSRFCookie.value

  await $fetch(tokenUrl, {
    baseURL: requestUrl,
    credentials: 'include',
  })

  const tokenValue = useCookie(tokenKey).value

  if (!tokenValue) {
    console.error('Laravel CSRF Cookie not set')
    throw new Error('Laravel CSRF Cookie not set')
  }

  return tokenValue
}
