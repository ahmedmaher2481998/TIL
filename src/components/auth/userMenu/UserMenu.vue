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
import { Primitive } from 'radix-vue';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = withDefaults(defineProps<{ name: string; avatar: string }>(), {})
const { openView } = usePopUp()

const handleEditProfile = () => {
  openView('updateUserProfile')
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Primitive as="button" class="rounded-full p-0 m-0 relative max-h-min ">
        <button>
          <UserAvatarDisplay :name="name" :avatar="avatar" :display-name="false" />
        </button>
      </Primitive>
      <!-- <Button variant="ghost" class="rounded-full p-0 m-0 max-h-min ">
        <UserAvatarDisplay :name="name" :avatar="avatar" :display-name="false" />
      </Button> -->
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 bg-foreground text-muted border-muted-foreground">
      <DropdownMenuItem>
        <UserAvatarDisplay :name="name" :avatar="avatar" :display-name="true" />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click.stop="handleEditProfile" class="flex cursor-pointer items-center gap-3">
        <AccountCircleOutlined class="mr-2 h-4 w-4" />
        <span>Edit profile</span>
      </DropdownMenuItem>

      <DropdownMenuItem @click.stop="openView('logout')" class="flex cursor-pointer items-center gap-3">
        <LogOutOutlined class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
