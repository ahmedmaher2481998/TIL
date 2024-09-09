<script setup lang="ts">
import { Avatar, AvatarFallback, AvatarImage, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components'
import { useAuth } from '@/stores';
import { storeToRefs } from 'pinia';
const auth = useAuth()
const { AuthStoreState } = storeToRefs(auth)
</script>
<template>
  <div>
    <div>
      <h3 class="text-xl font-bold">Latest Blog Posts Read</h3>
      <div class="mt-4 grid gap-4">
        <Card class="overflow-hidden rounded-lg">
          <CardContent class="p-0">
            <img src="/placeholder.svg" alt="Featured Post" width={600} height={400}
              class="h-[200px] w-full object-cover" :style='{ aspectRatio: "600/400", objectFit: "cover" }' />
          </CardContent>
          <CardHeader class="px-6 pt-4">
            <CardTitle>The Future of Remote Work</CardTitle>
            <CardDescription class="mt-2 text-muted-foreground">
              Exploring the long-term impact of remote work on the workforce.
            </CardDescription>
          </CardHeader>
          <CardFooter class="px-6 pb-4 pt-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar class="h-6 w-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Author" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>Emily Davis</span>
              <span>•</span>
              <span>January 5, 2023</span>
            </div>
          </CardFooter>
        </Card>
        <!-- <Card class="overflow-hidden rounded-lg">
          <CardContent class="p-0">
            <img src="/placeholder.svg" alt="Featured Post" width={600} height={400}
              class="h-[200px] w-full object-cover" style={{ aspectRatio: "600/400" , objectFit: "cover" }} />
          </CardContent>
          <CardHeader class="px-6 pt-4">
            <CardTitle>Mastering React Hooks</CardTitle>
            <CardDescription class="mt-2 text-muted-foreground">
              Dive into the power of React Hooks and learn how to leverage them in your projects.
            </CardDescription>
          </CardHeader>
          <CardFooter class="px-6 pb-4 pt-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar class="h-6 w-6 border">
                <AvatarImage src="/placeholder-user.jpg" alt="Author" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>Jane Doe</span>
              <span>•</span>
              <span>April 15, 2023</span>
            </div>
          </CardFooter>
        </Card> -->
      </div>
    </div>
  </div>
</template>


<style scoped></style>