<script setup lang="ts">
</script>
<template>

  <div class="flex min-h-screen flex-col items-center justify-center   text-background">
    <div class="container mx-auto px-4 py-12 md:px-6 md:py-24">
      <div class="mx-auto max-w-md text-center">
        <div class="animate-bounce text-primary mb-6 text-6xl font-bold">404
        </div>
        <h1 class="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-primary/80">Oops, page not found!
        </h1>
        <p class="mb-6 text-muted">The page you're looking for doesn't exist or has been moved.</p>
        <div class="flex flex-col gap-4 sm:flex-row">
          <router-link to="/"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            Go to Homepage
          </router-link>
          <router-link to="/blog"
            class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-muted shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            View Blog
          </router-link>
        </div>
      </div>
    </div>
    <div class="fixed inset-0 z-[-1] overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-3xl" />
      <div class="absolute inset-0 bg-gradient-to-br from-secondary to-primary opacity-20 blur-3xl" />
      <div class="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20 blur-3xl animate-pulse" />
    </div>
  </div>

</template>