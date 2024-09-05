<script setup lang="ts">
import { TagChip, UserAvatarDisplay } from '@/components'
// import { type BlogType } from '@/types/index'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge
} from '@/components'
import { formatDisplayDate, getInitials } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarTodayOutlined, ArrowUpwardOutlined } from '@vicons/material'
// import TagChipComponent from './DisplaySingleBlog/TagChip.component.vue'
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
  read_count: number
}
const { blog } = defineProps<{ blog: blogCardProps }>()
const ago = formatDisplayDate(blog.created_at, true)
</script>

<template lang="html">
  <Card class="overflow-hidden bg-secondary-foreground border-none text-card-foreground rounded-lg transition-all">
    <router-link :to="`/blog/${blog.slug}`">
      <CardContent class="p-0">
        <img :src="blog.image" alt="Featured Post" width="{600}" height="{400}" class="h-[200px] w-full object-cover"
          :style="{ aspectRatio: '600/400', objectFit: 'cover' }" />
      </CardContent>
      <CardHeader class="px-6 pt-4">
        <CardTitle class="text-primary-foreground">{{ blog.title }}</CardTitle>

        <CardDescription class="mt-2 text-muted-foreground">
          {{ blog.tldr }}
        </CardDescription>
      </CardHeader>
    </router-link>
    <CardContent>
      <div className="mb-2 flex flex-wrap gap-2">
        <router-link v-for="tag in blog.tags" :key="tag.id" :to="`tags/${tag.slug}`">
          <Badge variant="outline" class="text-muted"> # {{ tag.title }} </Badge>
        </router-link>
      </div>
    </CardContent>
    <CardFooter class="px-6 pb-4 pt-2">
      <div class="flex items-center gap-2 text-sm text-muted-foreground">

        <UserAvatarDisplay :name="blog.author" :avatar="blog.avatar" :ago="ago" />
      </div>
    </CardFooter>
  </Card>

</template>

<style lang=""></style>
