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
  transform: scale(.5);
  /* Start below the viewport */
}

.fade-leave-to {
  opacity: 0;
  transform: scale(.5);
  /* Move up and fade-route out */
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