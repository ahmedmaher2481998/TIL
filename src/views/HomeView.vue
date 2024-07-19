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
import { exampleBlog } from '@/types'
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
  <Card>
    <img
      class="max-w-lg h-[50%] bg-cover rounded-lg"
      :src="exampleBlog.image"
      alt="{{ exampleBlog.title }}"
    />
    <CardHeader>
      <CardTitle>{{ exampleBlog.title }}</CardTitle>
      <CardDescription>{{ exampleBlog.tldr }} , 22-april-2022</CardDescription>
    </CardHeader>
    <CardContent>{{ exampleBlog.content }} </CardContent>
    <CardFooter> Card Footer </CardFooter>
  </Card>
  <main>All goes here</main>
</template>
