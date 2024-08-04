import { handleLaravelRequest } from '../utils/laravel-request'
import capitalizeFirstLetter from '../utils/capitalize-first-letter'
import { useLaravelUser, type User } from './useLaravalUser'
import { FetchError } from 'ofetch'
import { useRuntimeConfig } from 'nuxt/app'

// TODO move all of these to the types folder
interface LaravelLoginData {
  email: string
  password: string
  remember?: boolean
}

interface LaravelRegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface PasswordResetData {
  token: string
  email: string
  password: string
  password_confirmation: string
}

type SocialAuthTypes =
  | 'google'
  | 'apple'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'github'
  | 'bitbucket'
  | 'gitlab'
  | 'slack'

export const useLaravelAuth = () => {
  const config = useRuntimeConfig().public.laravel

  const handleLoginWithEmail = async (data: LaravelLoginData) => {
    const res = await handleLaravelRequest(
      config.authLoginUrl,
      {
        method: 'POST',
        body: data,
      },
      'auth'
    )

    if (res.type === 'success') {
      await refreshLaravelUser()
    }

    return res
  }

  const handleRegisterWithEmail = async (data: LaravelRegisterData) => {
    const res = await handleLaravelRequest(
      config.authRegisterUrl,
      {
        method: 'POST',
        body: data,
      },
      'auth'
    )

    if (res.type === 'success') {
      await refreshLaravelUser()
    }

    return res
  }

  const handleLogout = async () => {
    const res = await handleLaravelRequest(
      config.authLogoutUrl,
      {
        method: 'POST',
      },
      'auth'
    )

    if (res.type === 'success') {
      await refreshLaravelUser()
    }

    return res
  }

  const handleForgotPassword = async (email: string) => {
    return await handleLaravelRequest(
      config.authForgotPasswordUrl,
      {
        method: 'POST',
        body: { email },
      },
      'auth'
    )
  }

  const handleResetPassword = async (data: PasswordResetData) => {
    return await handleLaravelRequest(
      config.authResetPasswordUrl,
      {
        method: 'POST',
        body: data,
      },
      'auth'
    )
  }

  const handleSocialAuth = (type: SocialAuthTypes) => {
    type SocialProvider = keyof typeof config.authProviders
    const providerConfig = `auth${capitalizeFirstLetter(
      type
    )}Url` as SocialProvider
    const socialAuthLink = config.authProviders[providerConfig]

    if (!socialAuthLink) {
      throw new Error(`Social auth type "${type}" is not supported`)
    }

    window.location.href = config.authBaseUrl + socialAuthLink
  }

  const refreshLaravelUser = async () => {
    const userState = useLaravelUser()

    try {
      const newUser = await handleLaravelRequest<User>('/api/user', {}, 'auth')

      if (newUser.type === 'success') {
        userState.value = newUser.data
      }

      if (newUser.type === 'error') {
        userState.value = null
      }
    } catch (error) {
      if (error instanceof FetchError) {
        if (error.status && [401, 419].includes(error.status)) {
          userState.value = null
        }
      }
    }
  }

  return {
    handleLoginWithEmail,
    handleRegisterWithEmail,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleSocialAuth,
    refreshLaravelUser,
  }
}
