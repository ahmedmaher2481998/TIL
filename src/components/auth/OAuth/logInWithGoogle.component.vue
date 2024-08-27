<script setup lang="ts">
import { Button } from '@/components/ui'
import { useAuth } from '@/stores'

const { loginWithGoogle } = useAuth()
</script>
<template>
  <Button
    @click.prevent="loginWithGoogle"
    class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-200 dark:text-slate-400 w-full hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-300 dark:hover:text-slate-600 hover:shadow transition duration-150"
  >
    <img
      class="w-6 h-6"
      src="https://www.svgrepo.com/show/475656/google-color.svg"
      loading="lazy"
      alt="google logo"
    />
    <span>Login with Google</span>
  </Button>
</template>

<style scoped></style>
