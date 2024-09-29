<template>
  <transition name="fade" mode="out-in">
    <slot />
  </transition>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Styles for the entering (new) route */
.fade-enter-from {
  opacity: 0;
}

/* * Styles for the Leaving (old) route */
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);

}

.fade-leave-active,
.fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
</style>