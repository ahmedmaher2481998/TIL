<template lang="html">
  <RouterLink v-if="click.linked" :to="click.href">
    <Badge :class="{
      'border me-1 cursor-pointer text-slate-100 border-white text-center w-full text-sm p-2 rounded-3xl':
        variant === 'glassy',
      '': variant === 'default'
    }">
      {{ '# ' + name }}
    </Badge>
  </RouterLink>

  <Badge v-else title="click to remove" variant="secondary" @click="click.onClickHandler" :class="{
    'border me-1 cursor-pointer text-slate-100 border-white text-center w-full text-sm p-2 rounded-3xl':
      variant === 'glassy',
    'px-3 py-2 hover:text-white hover:bg-red-700 cursor-pointer': variant === 'default'
  }">
    <span class="flex justify-center items-center">
      <span>

        {{ '# ' + name }}
      </span>
      <span class="h-4 w-4">
        <CloseFilled />
      </span>
    </span>
  </Badge>
</template>

<script setup lang="ts">
import { CloseFilled } from '@vicons/material'
import { Badge } from './ui/badge/index'
type ClickType =
  | { linked: true; href: string }
  | {
    linked: false
    onClickHandler: () => any
  }

type PropsType = {
  name: string
  variant: 'glassy' | 'default'
  click: ClickType

}
const { name: fieldName, click, variant } = defineProps<PropsType>()
</script>
