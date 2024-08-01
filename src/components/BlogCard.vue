<script setup lang="ts">
import { TagChip } from '@/components'
import { type BlogType } from '@/types/index'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDisplayDate, getInitials } from '@/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarTodayOutlined, ArrowUpwardOutlined } from '@vicons/material'
import { ref } from 'vue'
const { blog } = defineProps<{ blog: BlogType }>()
const ago = ref(formatDisplayDate(blog.createdat))
</script>

<template lang="html">
  <Card
    class="bg-green-100 text-white max-w-screen-lg relative overflow-hidden max-h-[500px] mx-2 md:mx-4"
  >
    <img class="bg-cover w-full rounded-lg" :src="blog.image" alt="{{ blog..title }}" />
    <div class="absolute bottom-0 glassy-feel w-full">
      <CardHeader>
        <!-- title with tldr  -->
        <div class="flex justify-between items-center w-full h-auto">
          <CardTitle class="font-semibold">{{ blog.title }}</CardTitle>
          <span
            class="h-10 text-sm w-10 rotate-45 hover:translate-x-1 hover:-translate-y-1 transition"
          >
            <ArrowUpwardOutlined class="font-thin" />
          </span>
        </div>
        <CardDescription class="text-slate-100 truncate">{{ blog.tldr }}</CardDescription>
      </CardHeader>

      <CardFooter class="flex items-center text-sm justify-between">
        <!-- author avatar with name  -->
        <div class="flex items-center justify-start">
          <div class="flex items-center justify-start gap-3">
            <Avatar>
              <AvatarImage :src="blog.user.avatar" :alt="blog.user.name" />
              <AvatarFallback>
                <!-- get initials  -->
                {{ getInitials(blog?.user.name ?? 'user name') }}
              </AvatarFallback>
            </Avatar>
            <span>{{ blog.user.name }}</span>
          </div>
          <div class="flex justify-center items-center gap-3 ms-4">
            <div class="h-10 p-2 border rounded-full w-10">
              <CalendarTodayOutlined />
            </div>
            <span> {{ ago }} </span>
          </div>
        </div>
        <!-- tags  -->
        <div class="flex gap-2">
          <TagChip
            v-for="tag in blog.tags"
            variant="glassy"
            :name="tag.title"
            :click="{
              href: '/tags/' + tag.id,
              linked: true
            }"
            :key="tag.id"
          />
        </div>
      </CardFooter>
    </div>
  </Card>
</template>

<style lang=""></style>
