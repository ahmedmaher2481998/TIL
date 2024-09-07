<script setup lang="ts">
// TODO use this component and make it look better
const currentYear = new Date().getFullYear()
</script>
<template>
  <footer class="bg-muted dark:bg-muted-background/10 py-8">
    <div class="container flex flex-col items-center justify-between gap-4 md:flex-row">
      <div class="text-sm text-muted">
        &copy; {{ currentYear }} blogy. All rights reserved.
      </div>
      <div class="flex items-center gap-4">
        <router-link to="#" class="text-sm font-medium hover:underline" prefetch="{false}">
          Twitter
        </router-link>
        <router-link to="#" class="text-sm font-medium hover:underline" prefetch="{false}">
          Instagram
        </router-link>
        <router-link to="#" class="text-sm font-medium hover:underline" prefetch="{false}">
          Newsletter
        </router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped></style>
