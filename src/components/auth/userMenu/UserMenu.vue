<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  UserAvatarDisplay
} from '@/components'
import { LogOutOutlined, AccountCircleOutlined } from '@vicons/material'
import { usePopUp } from '@/stores'

const props = withDefaults(defineProps<{ name: string; avatar: string }>(), {})
const { openView } = usePopUp()

const handleEditProfile = () => {
  console.log('to be done in the near future')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        <UserAvatarDisplay :name="name" :avatar="avatar" :display-name="false" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuItem>
        <UserAvatarDisplay :name="name" :avatar="avatar" :display-name="true" />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        @click.stop="handleEditProfile"
        class="flex cursor-pointer items-center gap-3"
      >
        <AccountCircleOutlined class="mr-2 h-4 w-4" />
        <span>Edit profile</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        @click.stop="openView('logout')"
        class="flex cursor-pointer items-center gap-3"
      >
        <LogOutOutlined class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
