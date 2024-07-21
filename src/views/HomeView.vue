<script setup lang="ts">
import Button from '@/components/ui/button/index'
import { exampleBlog } from '@/types'
import { BlogCard } from '@/components'
</script>

<template>
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

  <main class="bg-green-400">All goes here</main>
  <BlogCard :blog="exampleBlog" />
</template>
