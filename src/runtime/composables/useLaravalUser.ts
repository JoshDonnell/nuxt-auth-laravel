import { useState } from 'nuxt/app'
import { type Ref } from 'vue'

// Default interface for a User can be overwritten when calling any method
export interface User {
  name: string
  email?: string
}

export const useLaravelUser = <T = User>(): Ref<T | null | undefined> => {
  return useState<T | null | undefined>('user', () => undefined)
}
