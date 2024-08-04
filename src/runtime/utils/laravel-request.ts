import { getLaravelToken } from '../utils/laravel-token'
import { $fetch, type FetchOptions, type FetchError } from 'ofetch'
import {
  useRuntimeConfig,
  useRequestHeaders,
  useRequestURL,
  useNuxtApp,
} from 'nuxt/app'

// TODO move all of these to the types folder
interface LaravelError {
  errors?: Record<string, string[]> | never[]
  message?: string
}

interface LaravelSuccess<T> {
  data?: T
}

type RequestType = 'success' | 'error'

export interface LaravelReturnData<T> extends LaravelError, LaravelSuccess<T> {
  type: RequestType
}

export async function handleLaravelRequest<T = Record<string, unknown>>(
  url: string,
  options?: FetchOptions<'json'>,
  type: 'request' | 'auth' = 'request'
): Promise<LaravelReturnData<T>> {
  const app = useNuxtApp()
  const config = useRuntimeConfig().public.laravel
  const requestUrl = type === 'auth' ? config.authBaseUrl : config.baseUrl
  const requestTokenKey =
    type === 'auth' ? config.authRequestToken : config.requestToken

  const token = await getLaravelToken(type)

  return app.runWithContext(async () => {
    let headers: HeadersInit = {
      Accept: 'application/json',
      ...(token && { [requestTokenKey]: token }),
    }
    if (import.meta.server) {
      const clientCookies = useRequestHeaders(['cookie'])
      const originUrl = useRequestURL().origin
      headers = {
        ...headers,
        Origin: originUrl,
        ...(clientCookies.cookie && clientCookies),
      }
    }

    try {
      const res = await $fetch<T>(url, {
        baseURL: requestUrl,
        credentials: 'include',
        headers: headers,
        ...options,
      })

      return {
        type: 'success' as const,
        data: res,
      }
    } catch (e) {
      const error = e as FetchError
      const laravelError = error.response?._data as LaravelError

      return {
        type: 'error' as const,
        errors: laravelError.errors,
        message: laravelError.message,
      }
    }
  })
}
