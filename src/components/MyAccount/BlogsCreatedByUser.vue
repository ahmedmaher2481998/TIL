<script setup lang="ts">
import { useBlogs } from '@/stores';
import { storeToRefs } from 'pinia';

const { userBlogs } = storeToRefs(useBlogs())
</script>
<template>
  <div>
    <div>
      <h3 class="text-xl font-bold">Latest Blog Posts</h3>
      <div class="mt-4 grid gap-4">
        <Card class="overflow-hidden rounded-lg">
          <CardContent class="p-0">
            <img src="/placeholder.svg" alt="Featured Post" width={600} height={400}
              class="h-[200px] w-full object-cover" :style='{ aspectRatio: "600/400", objectFit: "cover" }' />
          </CardContent>
          <CardHeader class="px-6 pt-4">
            <CardTitle>Exploring the Metaverse</CardTitle>
            <CardDescription class="mt-2 text-muted-foreground">
              Discover the latest developments and potential of the metaverse.
            </CardDescription>
          </CardHeader>
          <CardFooter class="px-6 pb-4 pt-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar class="h-6 w-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Author" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>Sarah Smith</span>
              <span>•</span>
              <span>March 25, 2023</span>
            </div>
          </CardFooter>
        </Card>

      </div>
    </div>
  </div>
</template>


<style scoped></style>