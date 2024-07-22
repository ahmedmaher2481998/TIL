<template lang="html">
  <div class="mt-10">
    <MdEditor v-model="blogBody" language="en-US">

    </MdEditor>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Label } from "@/components"
// @ts-ignore
import { MdEditor } from 'md-editor-v3';

const blogBody = ref('# Hello Editor');


</script>
<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="md-editor-v3/lib/style.css"></style>