<script setup>
import { BlogsCreatedByUser, BlogsReadByUser, UserProfile } from '@/components';
import { useAuth, useBlogs } from '@/stores';
import { notify } from '@/utils';
import { storeToRefs } from 'pinia';
import { watchEffect } from 'vue';
const { getUsersBlogs } = useBlogs()
const { AuthStoreState } = storeToRefs(useAuth())
watchEffect(async () => {
  if (!AuthStoreState.value.isAuth) return
  try {
    console.log('get users blogs ...')
    await getUsersBlogs()

  } catch (error) {
    notify.error({
      title: 'Error loading your activity',
      description: error.message
    })
  }
})
</script>
<template>
  <div class="px-4 md:px-0 dark:bg-background dark:text-foreground md:container">
    <main>
      <section class="bg-background dark:bg-background py-12 md:py-24">
        <div class="md:container">
          <div class="grid gap-8 grid-cols-1 md:grid-cols-2">
            <div class="col-span-1 row-span-1">
              <UserProfile />
              <div class="mt-4">

                <BlogsReadByUser />
              </div>
            </div>
            <div class="col-span-1 row-span-1">
              <BlogsCreatedByUser />

            </div>
          </div>
        </div>
      </section>
    </main>

  </div>
</template>


<style lang="scss" scoped></style>
