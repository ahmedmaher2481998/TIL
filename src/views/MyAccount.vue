<script setup>
import { BlogsCreatedByUser, BlogsReadByUser, UserProfile } from '@/components'
import { useAuth, useBlogs } from '@/stores';
import { notify } from '@/utils';
import { console } from 'inspector';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onMounted, watch } from 'vue';
const { getUsersBlogs } = useBlogs()
const { AuthStoreState } = storeToRefs(useAuth())
watch(async () => {
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
  <div class="dark:bg-background dark:text-foreground container">

    <main>
      <section class="bg-background dark:bg-background py-12 md:py-24">
        <div class="container">
          <div class="grid gap-8 md:grid-cols-2">
            <UserProfile />
            <BlogsCreatedByUser />
            <BlogsReadByUser />
          </div>
        </div>
      </section>
    </main>

  </div>
</template>


<style lang="scss" scoped></style>
