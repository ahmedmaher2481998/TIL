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
      <MdEditor :noUploadImg="true" v-model="value" language="en-US" @wheel.stop> </MdEditor>
      <p v-if="errors.length" class="text-sm font-medium text-destructive">
        {{ errorMessage }}
      </p>
    </FormItem>
  </div>
</template>
<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="md-editor-v3/lib/style.css"></style>
<style>
/* Light Theme */
.md-editor {
  --md-color: hsl(var(--secondary-foreground));
  --md-hover-color: hsl(var(--muted-foreground));
  --md-bk-color: hsl(var(--background));
  --md-bk-color-outstand: hsl(var(--card));
  --md-bk-hover-color: hsl(var(--accent) / 0.1);
  --md-border-color: hsl(var(--border));
  --md-border-hover-color: hsl(var(--border) / 0.8);
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--background) / 0.2);
  --md-scrollbar-bg-color: hsl(var(--muted) / 0.3);
  --md-scrollbar-thumb-color: hsl(var(--muted));
  --md-scrollbar-thumb-hover-color: hsl(var(--muted-foreground));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));

  background-color: var(--md-bk-color);
  color: var(--md-color);
  border-color: var(--md-border-color);
  transition: var(--md-transition);
}

#preview-only-preview {
  word-break: keep-all !important;
}

.md-editor-toolbar {
  background-color: hsl(var(--card));
  border-bottom-color: var(--md-border-color);
}

.md-editor-toolbar-item {
  color: var(--md-color);
  background-color: transparent;
  transition: var(--md-transition);
}

.md-editor-toolbar-item:hover {
  color: hsl(var(--primary));
  background-color: var(--md-bk-hover-color);
}

.md-editor-content {
  background-color: var(--md-bk-color);
}

.md-editor-footer {
  background-color: hsl(var(--card));
  border-top-color: var(--md-border-color);
}

.md-editor-resize-operate {
  background: hsl(var(--primary));
  border-color: hsl(var(--primary));
}

/* Dark Theme */
.md-editor-dark {
  --md-color: hsl(var(--foreground));
  --md-hover-color: hsl(var(--muted-foreground));
  --md-bk-color: hsl(var(--background));
  --md-bk-color-outstand: hsl(var(--card));
  --md-bk-hover-color: hsl(var(--accent) / 0.2);
  --md-border-color: hsl(var(--border));
  --md-border-hover-color: hsl(var(--border) / 0.8);
  --md-border-active-color: hsl(var(--ring));
  --md-modal-mask: hsl(var(--background) / 0.8);
  --md-scrollbar-bg-color: hsl(var(--muted) / 0.3);
  --md-scrollbar-thumb-color: hsl(var(--muted));
  --md-scrollbar-thumb-hover-color: hsl(var(--muted-foreground));
  --md-scrollbar-thumb-active-color: hsl(var(--primary));
}

/* Adjustments for both themes */
.md-editor,
.md-editor-dark {
  --md-radius: var(--radius);
}

.md-editor-toolbar,
.md-editor-footer {
  border-radius: var(--md-radius);
}

.md-editor-toolbar-item,
.md-editor-toolbar-item-dropdown {
  border-radius: calc(var(--md-radius) - 2px);
}

.md-editor input[type="checkbox"],
.md-editor-dark input[type="checkbox"] {
  accent-color: hsl(var(--primary));
}
</style>