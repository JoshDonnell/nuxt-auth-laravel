<script setup lang="ts">
const user = useLaravelUser()
const {
  handleLoginWithEmail,
  handleLogout,
  handleRegisterWithEmail,
  handleSocialAuth,
} = useLaravelAuth()

interface Team {
  id: number
  name: string
  logo: string
  bio: string
}

interface LaravelResponse<T> {
  data: T
}

const { data } = await useAsyncLaravelRequest<LaravelResponse<Team[]>>(
  '/api/teams',
  'test'
)

const handleLogin = async () => {
  handleLoginWithEmail({
    email: 'danny.painter@purposemedia.co.uk',
    password: 'password',
  })
}

const handleRegister = async () => {
  await handleRegisterWithEmail({
    name: 'Test Name',
    email: 'test@test.com',
    password: 'password',
    password_confirmation: 'password',
  })
}
</script>

<template>
  <div>
    <div v-if="data && data.data">
      <div v-for="item in data.data" :key="item.id">
        <span>{{ item.name }}</span>
        <img :src="item.logo" alt="logo" />
        <p>{{ item.bio }}</p>
      </div>
    </div>

    <span v-if="user && user.name">{{ user.name }}</span>

    <button v-if="!user || !user.name" @click="handleLogin">Login</button>

    <button v-if="!user || !user.name" @click="handleRegister">Register</button>

    <button v-if="!user || !user.name" @click="handleSocialAuth('google')">
      Login With Google
    </button>

    <button v-else @click="handleLogout">Logout</button>

    <NuxtLink v-if="!user" href="/forgot-password">Forgot Password</NuxtLink>
  </div>
</template>
