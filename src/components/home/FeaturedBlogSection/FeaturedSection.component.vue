<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, MainFeaturedBlogComponent, SecondaryFeaturedBlogComponent, Separator } from '@/components'

</script>
<template>

  <section class=" w-full mb-20">
    <div class="container mb-6 ">
      <h2 class="text-2xl font-bold text-primary leading-tight">Featured</h2>
    </div>
    <div class="container w-full grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <!-- TODO add main feature blog post -->
      <!-- <section class="bg-muted/50 py-12 md:py-24">
        <div class="container grid gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
          <div class="space-y-4">
            <div class="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              Featured Post
            </div>
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Joke Tax Chronicles</h1>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar class="h-6 w-6 border-2 border-primary">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <span>Acme Inc</span>
              <Separator orientation="vertical" class="h-4" />
              <span>August 24, 2023</span>
            </div>
            <p class="text-muted-foreground">
              Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his
              throne. One day, his advisors came to him with a problem: the kingdom was running out of money.
            </p>
            <RouterLink to="#"
              class="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              prefetch={false}>
              Read More
            </RouterLink>
          </div>
          <img src="/placeholder.svg" width={800} height={600} alt="Featured Post"
            class="aspect-video overflow-hidden rounded-lg object-cover" />
        </div>
      </section> -->

      <MainFeaturedBlogComponent />
      <SecondaryFeaturedBlogComponent />
    </div>
  </section>
</template>

<style scoped></style>
