<script setup lang="ts">
import Button from '@/components/ui/button/index'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { getInitials } from '@/utils'
import { exampleBlog } from '@/types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CalendarTodayOutlined, ArrowUpwardOutlined } from '@vicons/material'
</script>

<template>
  <nav class="w-full bg-zinc-800 shadow-lg text-white sticky">
    <div class="w-full container flex pt-4 mb-6 p-2 items-center justify-between">
      <router-link to="/" class="font-bold font-main">Blogy</router-link>
      <Button>Create new Blog</Button>
    </div>
  </nav>
  <!-- title component  -->
  <h1 class="text-pretty font-semibold leading-none tracking-tight text-7xl md:text-2xl">
    Blog card
  </h1>
  <!-- inspiration 
  https://dribbble.com/shots/24288831-slothUI-World-s-Laziest-Design-System-Blog-Article-Page-UIUX
   -->
  <!-- Chip component  -->
  <!-- import { Badge } from '@/components/ui/badge' try ti utilize it  -->
  <!-- <span class="border me-1  text-white border-white text-center w-full text-sm p-2 rounded-3xl">
    Ui Ux
  </span> -->
  <!-- Components ,Blog card, Tag chip -->

  <Card
    class="bg-green-100 text-white max-w-screen-lg relative overflow-hidden max-h-[500px] mx-2 md:mx-4"
  >
    <img
      class="bg-cover w-full rounded-lg"
      :src="exampleBlog.image"
      alt="{{ exampleBlog.title }}"
    />
    <div class="absolute bottom-0 glassy-feel w-full">
      <CardHeader>
        <!-- title with tldr  -->
        <div class="flex justify-between items-center w-full h-auto">
          <CardTitle class="font-semibold">{{ exampleBlog.title }}</CardTitle>
          <span
            class="h-10 text-sm w-10 rotate-45 hover:translate-x-1 hover:-translate-y-1 transition"
          >
            <ArrowUpwardOutlined class="font-thin" />
          </span>
        </div>
        <CardDescription class="text-slate-200 truncate">{{ exampleBlog.tldr }}</CardDescription>
      </CardHeader>

      <CardFooter class="flex items-center text-sm justify-between">
        <!-- author avatar with name  -->
        <div class="flex items-center justify-start">
          <div class="flex items-center justify-start gap-3">
            <Avatar>
              <AvatarImage :src="exampleBlog.author.avatar" :alt="exampleBlog.author.name" />
              <AvatarFallback>
                <!-- get initials  -->
                {{ getInitials(exampleBlog.author.name) }}
              </AvatarFallback>
            </Avatar>
            <span>{{ exampleBlog.author.name }}</span>
          </div>
          <div class="flex justify-center items-center gap-3 ms-4">
            <div class="h-10 p-2 border rounded-full w-10">
              <CalendarTodayOutlined />
            </div>
            <span> 22,April 2024 </span>
          </div>
        </div>
        <!-- tags  -->
        <div class="">
          <span
            class="border me-1 cursor-pointer text-slate-200 border-white text-center w-full text-sm p-2 rounded-3xl"
          >
            Ui Ux
          </span>
          <span
            class="border me-1 cursor-pointer text-slate-200 border-white text-center w-full text-sm p-2 rounded-3xl"
          >
            React
          </span>
          <span
            class="border me-1 cursor-pointer text-slate-200 border-white text-center w-full text-sm p-2 rounded-3xl"
          >
            Three js
          </span>
        </div>
      </CardFooter>
    </div>
  </Card>
  <main>All goes here</main>
</template>
