<script setup lang="ts">
// TODO use this component and make it look better
const currentYear = new Date().getFullYear()
</script>
<template>
  <footer className="bg-muted dark:bg-muted-foreground/10 py-8">
    <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="text-sm text-muted-foreground">
        &copy; {{ currentYear }} blogy. All rights reserved.
      </div>
      <div className="flex items-center gap-4">
        <router-link to="#" className="text-sm font-medium hover:underline" prefetch="{false}">
          Twitter
        </router-link>
        <router-link to="#" className="text-sm font-medium hover:underline" prefetch="{false}">
          Instagram
        </router-link>
        <router-link to="#" className="text-sm font-medium hover:underline" prefetch="{false}">
          Newsletter
        </router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
