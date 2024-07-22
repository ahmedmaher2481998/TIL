<template lang="html">
  <div class="grid w-full max-w-sm items-center gap-1.5">
    <Label for="picture" class="mb-2 bg-">Upload Blog Cover</Label>
    <div class="relative w-full cursor-pointer items-center">
      <Input id="picture" type="file" class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <UploadOutlined class="size-6 text-muted-foreground" />
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Label, Input } from '@/components'
import { UploadOutlined } from '@vicons/material'
</script>
