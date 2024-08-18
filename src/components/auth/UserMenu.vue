<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  UserAvatarDisplay
} from '@/components'
import { defineProps } from 'vue'
import type { UserType } from '@/types'
import { LogOutOutlined, AccountCircleOutlined } from '@vicons/material'
import { getInitials } from '@/utils'
import { usePopUp } from '@/stores/popUpStore'
const props = defineProps<{ user: UserType }>()
console.log('🚀 ~ user:', props.user)
const { openView } = usePopUp()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        <UserAvatarDisplay
          :name="props.user.name"
          :avatar="props.user.avatar"
          :display-name="false"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuItem>
        <UserAvatarDisplay :name="props.user.name" :avatar="props.user.avatar" />
        <!-- <Avatar>
          <avatar-image :src="props.user.avatar"> </avatar-image>
          <avatar-fallback>
            {{ getInitials(props.user.name) }}
          </avatar-fallback>
        </Avatar>
        <p>
          {{ props.user.name }}
        </p> -->
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <!-- TODO edit profile pop up -->
      <DropdownMenuItem @click.stop="" class="flex cursor-pointer items-center gap-3">
        <AccountCircleOutlined class="mr-2 h-4 w-4" />
        <span>Edit profile <info></info></span>
      </DropdownMenuItem>

      <DropdownMenuItem
        @click.stop="openView('logout')"
        class="flex cursor-pointer items-center gap-3"
      >
        <LogOutOutlined class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
      <!-- </DropdownMenuGro  up> -->
    </DropdownMenuContent>
  </DropdownMenu>
</template>
