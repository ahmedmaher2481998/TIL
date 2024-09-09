<script setup lang="ts">
import { Button } from '@/components'
</script>
<template>
  <div class="flex min-h-screen flex-col items-center justify-center text-background">
    <div class="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <div class="mx-auto max-w-md text-center">
        <div class="mb-6 text-6xl font-bold text-primary animate-bounce">404</div>
        <h1 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-primary/80">Oops, page not found!</h1>
        <p class="mb-6 text-secondary-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div class="flex flex-col gap-4 sm:flex-row">
          <router-link to="/">
            <Button variant="default">
              Go to Homepage
            </Button>
          </router-link>
          <router-link to="/blog">
            <Button variant="secondary">
              View Blog
            </Button>
          </router-link>
        </div>
      </div>
    </div>
    <div class="fixed inset-0 z-[-1] overflow-hidden">
      <!-- <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-secondary to-primary opacity-20 blur-3xl"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-3xl animate-pulse"></div> -->
    </div>
  </div>

</template>