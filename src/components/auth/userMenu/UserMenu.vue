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
import { CircleUserRound, LogOut, User2Icon, UserCog } from 'lucide-vue-next';

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
      <Button variant="ghost" class="rounded-full p-0 m-0 max-h-min " size="icon">
        <UserAvatarDisplay classes='hover:text-background' :name="name" :avatar="avatar" :display-name="false" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56   ">
      <DropdownMenuItem class="flex   cursor-pointer items-center gap-3">
        <RouterLink to="my-account" class="flex gap-2">
          <User2Icon />
          My Account
        </RouterLink>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click.stop="handleEditProfile" class="flex  cursor-pointer items-center gap-3">
        <UserCog class="mr-2 h-4 w-4" />
        <span>Edit profile</span>
      </DropdownMenuItem>

      <DropdownMenuItem @click.stop="openView('logout')" class="flex   cursor-pointer items-center gap-3">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
