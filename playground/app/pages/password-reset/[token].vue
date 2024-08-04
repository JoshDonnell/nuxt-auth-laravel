<script setup lang="ts">
const { handleResetPassword } = useLaravelAuth()
const route = useRoute()

const form = reactive({
  token: route.params.token as string,
  email: route.query.email as string,
  password: '',
  password_confirmation: '',
})

const handleReset = async () => {
  if (!form.password || !form.password_confirmation) return
  await handleResetPassword(form)
}
</script>

<template>
  <div>Reset my password</div>
  <input v-model="form.password" type="text" placeholder="Password" />
  <input
    v-model="form.password_confirmation"
    type="text"
    placeholder="Password Confirmation"
  />
  <button @click="handleReset">Reset Password</button>
</template>
