<script setup lang="ts">
import { TagChip } from '@/components'
// import { type BlogType } from '@/types/index'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDisplayDate, getInitials } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarTodayOutlined, ArrowUpwardOutlined } from '@vicons/material'
import TagChipComponent from './DisplaySingleBlog/TagChip.component.vue'
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
  <Card
    class="bg-green-100 text-white max-w-screen-lg relative overflow-hidden max-h-[500px] mx-2 md:mx-4"
  >
    <router-link class="bg-cover w-full rounded-lg" :to="`/blog/${blog.slug}`">
      <img class="bg-cover w-full rounded-lg" :src="blog.image" alt="{{ blog.title }}" />
    </router-link>
    <div class="absolute bottom-0 glassy-feel w-full">
      <CardHeader>
        <!-- title with tldr  -->
        <div class="flex justify-between items-center w-full h-auto">
          <CardTitle class="font-semibold">{{ blog.title }}</CardTitle>
          <span
            class="h-10 text-sm w-10 rotate-45 hover:translate-x-1 hover:-translate-y-1 transition"
          >
            <ArrowUpwardOutlined class="font-thin hidden lg:inline-block" />
          </span>
        </div>
        <CardDescription class="text-slate-100 truncate">{{ blog.tldr }}</CardDescription>

        <div class="w-full flex flex-wrap gap-2 mt-3">
          <TagChipComponent
            v-for="tag in blog.tags"
            :key="tag.id"
            :title="tag.title"
            :slug="tag.slug"
            variant="glassy"
          />
          <!-- <TagChip
            v-for="tag in blog.tags"
            variant="glassy"
            :name="tag.title"
            :click="{
              href: '/tags/' + tag.id,
              linked: true
            }"
            :key="tag.id"
          /> -->
        </div>
      </CardHeader>

      <CardFooter class="flex flex-col text-sm items-start">
        <!-- author avatar with name  -->
        <div class="flex items-center justify-start">
          <div class="flex items-center justify-start gap-3">
            <Avatar>
              <AvatarImage :src="blog.avatar" :alt="blog.author" />
              <AvatarFallback>
                <!-- get initials  -->
                {{ getInitials(blog?.author ?? 'user name') }}
              </AvatarFallback>
            </Avatar>
            <span>{{ blog?.author }}</span>
          </div>
          <div class="flex justify-center items-center gap-3 ms-4">
            <div class="h-10 p-2 border rounded-full w-10">
              <CalendarTodayOutlined />
            </div>
            <span> {{ ago }} </span>
          </div>
        </div>
      </CardFooter>
    </div>
  </Card>
</template>

<style lang=""></style>
