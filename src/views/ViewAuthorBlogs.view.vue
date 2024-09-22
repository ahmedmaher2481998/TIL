  <script setup lang="ts">
  import { useRoute } from 'vue-router/dist/vue-router';

  const route = useRoute()
  const id = route.params.id;

</script>
<template>
  <div>
    Hi there id : {{ id }}
  </div>
</template>


<style lang="scss" scoped></style>