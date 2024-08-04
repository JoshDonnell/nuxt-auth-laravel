<script setup lang="ts">
const { handleForgotPassword } = useLaravelAuth()
const input = ref('')

const handleReset = async () => {
  if (!input.value) return
  await handleForgotPassword(input.value)
}
</script>

<template>
  <div>Reset my password</div>
  <input v-model="input" type="text" placeholder="Type your email here" />
  <button @click="handleReset">Reset Password</button>
</template>
