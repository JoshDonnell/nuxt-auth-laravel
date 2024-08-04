import { defineNuxtPlugin } from "nuxt/app";
import { useLaravelUser } from "../composables/useLaravalUser";
import { useLaravelAuth } from "../composables/useLaravelAuth";

export default defineNuxtPlugin(async () => {
  const user = useLaravelUser();

  if (user.value !== undefined) return;

  const { refreshLaravelUser } = useLaravelAuth();
  await refreshLaravelUser();
});
