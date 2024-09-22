<script setup lang="ts">
import { UserAvatarDisplay } from '@/components'
import {
  Badge,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components'
import { formatDisplayDate } from '@/utils'
type blogCardProps = {
  id: number
  title: string
  tldr: string
  image: string
  created_at: string
  tags: { id: number; title: string; slug: string }[]
  avatar: string
  author: string
  slug: string
  read_count: number,
  authorId: string
}
const { blog } = defineProps<{ blog: blogCardProps }>()
const ago = formatDisplayDate(blog.created_at, true)
</script>

<template lang="html">
  <Card class="overflow-hidden bg-primary-foreground border-foreground/30 text-card rounded-lg transition-all">
    <router-link :to="`/blog/${blog.slug}`">
      <CardContent class="p-0">
        <img :src="blog.image" alt="Featured Post" width="{600}" height="{400}" class="h-[200px] w-full object-cover"
          :style="{ aspectRatio: '600/400', objectFit: 'cover' }" />
      </CardContent>
    </router-link>
    <CardHeader class="px-6 pt-4">
      <CardTitle class="text-primary">{{ blog.title }}</CardTitle>

      <div class="mb-2 flex flex-wrap gap-2">
        <router-link v-for="tag in blog.tags" :key="tag.id" :to="`tags/${tag.slug}`">
          <Badge variant="default"> # {{ tag.title }} </Badge>
        </router-link>
      </div>
      <CardDescription class="mt-2 ">
        {{ blog.tldr }}
      </CardDescription>
    </CardHeader>

    <CardContent>
    </CardContent>
    <CardFooter class="px-6 pb-4 pt-2">
      <div class="flex items-center gap-2 text-sm ">
        <!-- TODO check author is passed  -->
        <UserAvatarDisplay :name="blog.author" :avatar="blog.avatar" :ago="ago" :authorId="blog.authorId" />
      </div>
    </CardFooter>
  </Card>

</template>

<style lang=""></style>
