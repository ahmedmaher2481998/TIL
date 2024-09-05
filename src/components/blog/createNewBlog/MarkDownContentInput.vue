<script setup lang="ts">
import { FormItem, Label } from '@/components'
import { MdEditor } from 'md-editor-v3'
import { useField } from 'vee-validate'

const { value, errors, errorMessage } = useField<string>('content')
</script>
<template lang="html">
  <div class="mt-10">
    <FormItem>
      <Label :class="{ 'text-red-600': errors.length }">post Content</Label>
      <MdEditor v-model="value" language="en-US"> </MdEditor>
      <p v-if="errors.length" class="text-sm font-medium text-destructive">
        {{ errorMessage }}
      </p>
    </FormItem>
  </div>
</template>
<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="md-editor-v3/lib/style.css"></style>
