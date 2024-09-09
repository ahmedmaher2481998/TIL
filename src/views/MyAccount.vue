<script setup>
import { BlogsCreatedByUser, BlogsReadByUser, UserProfile } from '@/components'
import { useBlogs } from '@/stores';
import { notify } from '@/utils';
import { onBeforeMount } from 'vue';
const { getUsersBlogs } = useBlogs()
onBeforeMount(async () => {
  try {
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
