<script setup lang="ts">
import {
  ChangeAvatarTab,
  ChangePasswordTab,
  ChangeProfileName,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components'
import { updateProfileTabs } from './updateProfileTabs.enum'
import { storeToRefs } from 'pinia';
import { useAuth } from '@/stores';
const { AuthStoreState } = storeToRefs(useAuth())

</script>

<template>
  <DialogContent class="sm:max-w-[425px] md:max-w-lg flex justify-center items-center w-full border-muted  text-muted">
    <DialogHeader class="hidden">
      <DialogTitle>update profile</DialogTitle>
      <DialogDescription>
        modify your account data.
      </DialogDescription>
    </DialogHeader>
    <Tabs default-value="name" class="w-full mt-6">
      <TabsList class="flex justify-between items-center w-full ">
        <TabsTrigger :value="updateProfileTabs.name" class='capitalize w-full '>
          {{ updateProfileTabs.name }}
        </TabsTrigger>
        <TabsTrigger :value="updateProfileTabs.password" v-if="AuthStoreState.provider === 'email'"
          class='capitalize w-full '>
          {{ updateProfileTabs.password }}
        </TabsTrigger>
        <TabsTrigger :value="updateProfileTabs.avatar" class='capitalize w-full '>
          {{ updateProfileTabs.avatar }}
        </TabsTrigger>
      </TabsList>
      <TabsContent v-if="AuthStoreState.provider === 'email'" :value="updateProfileTabs.name">
        <ChangeProfileName />
      </TabsContent>
      <TabsContent v-if="AuthStoreState.provider === 'email'" :value="updateProfileTabs.password">
        <ChangePasswordTab />
      </TabsContent>
      <TabsContent :value="updateProfileTabs.avatar">
        <ChangeAvatarTab />
      </TabsContent>

    </Tabs>
  </DialogContent>
</template>
