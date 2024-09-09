<template lang="html">
  <RouterLink v-if="click.linked" :to="click.href">
    <Badge :class="{
      'border me-1 cursor-pointer glassy-feel text-slate-100 border-white text-center w-full text-sm p-2 rounded-3xl':
        variant === 'glassy',
      '': variant === 'default'
    }">
      {{ '# ' + name }}
    </Badge>
  </RouterLink>

  <Badge v-else title="click to remove" :variant="variant" @click="click.onClickHandler" class="p-2 cursor-pointer">
    <span title="click to remove" class="flex justify-center items-center">

      {{ '# ' + name }}

    </span>
  </Badge>
</template>

<script setup lang="ts">
import { X } from 'lucide-vue-next';

import { Badge } from '@/components'
type ClickType =
  | { linked: true; href: string }
  | {
    linked: false
    onClickHandler: () => any
  }

type PropsType = {
  name: string
  variant: 'secondary' | 'default' | 'destructive'
  click: ClickType
}
const { name, click, variant = 'secondary' } = defineProps<PropsType>()
</script>
