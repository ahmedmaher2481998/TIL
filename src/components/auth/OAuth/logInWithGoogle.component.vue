<script setup lang="ts">
import { Button } from '@/components/ui'
import { useAuth } from '@/stores'

const { loginWithGoogle } = useAuth()
</script>
<template>
  <Button @click.prevent="loginWithGoogle"
    class="px-4 py-2 flex gap-2 rounded-lg text-muted w-full hover:border-slate-200  hover:shadow transition duration-150">
    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
    <span>Login with Google</span>
  </Button>
</template>

<style scoped></style>
