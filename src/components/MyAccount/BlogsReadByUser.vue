<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, BlogCardSkeleton, Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components'
import { useAuth, useBlogs } from '@/stores';
import { formatDisplayDate, getInitials } from '@/utils';
import { storeToRefs } from 'pinia';
const blogs = storeToRefs(useBlogs())
const { userBlogs } = blogs
</script>
<template>
  <div>
    <div>
      <h3 class="text-xl text-primary font-bold">Latest of your Reads</h3>
      <div class="mt-4 grid gap-4">
        <BlogCardSkeleton v-if="!userBlogs.read" />
        <Card v-else-if="userBlogs.read?.length > 0" v-for="blog in userBlogs.read" :key="blog.id"
          class="overflow-hidden rounded-lg">
          <CardContent class="p-0">
            <img :src="blog.image_url" :alt="blog.title" width={600} height={400} class="h-[200px] w-full object-cover"
              :style='{ aspectRatio: "600/400", objectFit: "cover" }' />
          </CardContent>
          <CardHeader class="px-6 pt-4">
            <CardTitle>{{ blog.title }}</CardTitle>
            <CardDescription class="mt-2 text-muted-foreground truncate">
              {{ blog.description }}
            </CardDescription>
          </CardHeader>
          <CardFooter class="px-6 pb-4 pt-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar class="h-6 w-6 border">
                <AvatarImage :src="blog.profiles?.user_metadata['avatar'] ?? ''" alt="Author" />
                <AvatarFallback>{{ getInitials(blog.profiles?.user_metadata['name'] ?? '') }}</AvatarFallback>
              </Avatar>
              <span>{{ blog.profiles?.user_metadata.name }}</span>
              <span>•</span>
              <span>{{ formatDisplayDate(blog.created_at, true) }}</span>
            </div>
          </CardFooter>
        </Card>
        <div v-else class="text-secondary-foreground/80 text-lg">
          you didn't Read anything yet,
          <RouterLink to="/blog" class="text-base p-0 m-0 underline underline-offset-4">
            explore more ...
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped></style>