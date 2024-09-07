<script setup lang="ts">
import { Skeleton } from '@/components';
</script>

<template>


  <div class="w-full  flex flex-col px-2">
    <div class="container pt-4">
      <!-- Skeleton for Blog Title -->
      <Skeleton class="h-10 w-3/4 mb-6 rounded" />
      <!-- Skeleton for Author Display -->
      <div class="flex flex-col mb-4">
        <div class="flex items-center gap-4">
          <Skeleton class="h-12 w-12 rounded-full" /> <!-- Avatar -->
          <Skeleton class="h-4 w-1/3 rounded" /> <!-- Author Name -->
        </div>
        <Skeleton class="h-4 w-1/4 pl-6 mt-2 rounded" /> <!-- Time Ago -->
      </div>
      <!-- Skeleton for Blog Tags -->
      <div class="mb-2 flex flex-wrap gap-2">
        <Skeleton class="h-6 w-16 rounded" />
        <Skeleton class="h-6 w-12 rounded" />
        <Skeleton class="h-6 w-20 rounded" />
      </div>
      <!-- Skeleton for Blog Image -->
      <Skeleton class="h-96 w-full rounded" />
      <div class="max-w-screen-md mx-auto pt-20">
        <!-- Skeleton for Blog Content (Markdown Preview) -->
        <div class="flex flex-col gap-4 mt-6">
          <Skeleton class="h-4 w-full rounded" />
          <Skeleton class="h-4 w-5/6 rounded" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-4 w-4/5 rounded" />
          <Skeleton class="h-4 w-5/6 rounded" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-4 w-4/5 rounded" />
          <Skeleton class="h-4 w-full rounded" />
          <Skeleton class="h-4 w-5/6 rounded" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-4 w-4/5 rounded" />
          <Skeleton class="h-4 w-full rounded" />
          <Skeleton class="h-4 w-5/6 rounded" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-4 w-4/5 rounded" />
          <Skeleton class="h-4 w-5/6 rounded" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-4 w-4/5 rounded" />
          <Skeleton class="h-4 w-full rounded" />
          <Skeleton class="h-4 w-5/6 rounded" />
          <Skeleton class="h-4 w-3/4 rounded" />
          <Skeleton class="h-4 w-4/5 rounded" />
        </div>
      </div>
    </div>
  </div>
</template>