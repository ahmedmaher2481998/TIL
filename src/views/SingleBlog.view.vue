<script setup lang="ts">
import supabase from '@/supabase'
import { Tables } from '@/types'
import { useRoute } from 'vue-router'
import { MdPreview } from 'md-editor-v3'
import 'md-editor-v3/lib/preview.css'
import { Badge, UserAvatarDisplay, TagChipComponent } from '@/components'
import { formatDisplayDate } from '@/utils'
const route = useRoute()
const id = 'preview-only'
const { data } = await supabase
  .from(Tables.Blogs)
  .select(`*,comments(*),profiles(*),tags(*)`)
  .eq('slug', route.params.slug)
  .single()
console.log('blog data: ', data)

// const scrollElement = document.documentElement
const ago = formatDisplayDate(data?.created_at ?? '', true)
const user = {
  // @ts-ignore
  name: data?.profiles?.user_metadata.name ?? ('' as string),
  // @ts-ignore
  avatar: data?.profiles?.user_metadata?.avatar ?? ('' as string)
}
</script>

<template>
  <div class="w-full bg-foreground text-white flex flex-col px-2">
    <div class="container pt-4">
      <!-- <div class="w-full relative h-full "> -->
      <img
        :src="data?.image_url"
        :alt="data?.description"
        class="h-full object-cover max-h-96 rounded w-full"
      />
      <!-- <div class="w-full absolute bottom-0 bg-black bg-opacity-50 pt-6 pb-8">
          
        </div> -->
      <!-- </div> -->
      <div class="max-w-screen-md mx-auto pt-20">
        <h1 class="text-white text-3xl mb-6">
          {{ data?.title }}
        </h1>
        <div class="flex flex-col items-start gap-6">
          <!-- author display  -->
          <div class="flex flex-col">
            <UserAvatarDisplay :display-name="true" :avatar="user.avatar" :name="user.name" />
            <span class="text-thin pl-16 text-muted-foreground mb-0">{{ ago }}</span>
          </div>
        </div>
        <!-- display tags  -->
        <div className="mb-2 flex flex-wrap gap-2">
          <router-link v-for="tag in data?.tags" :key="tag.id" :to="`tags/${tag.slug}`">
            <Badge variant="outline" class="text-muted"> # {{ tag.title }} </Badge>
          </router-link>
        </div>

        <!-- <div class="flex justify-start gap-3 items-center pt-2">
          <TagChipComponent
            v-for="tag in data?.tags"
            :key="tag.id"
            :title="tag.title"
            :slug="tag.slug"
          />
        </div> -->
        <MdPreview class="mt-0" :editor-id="id" :modelValue="data?.content" />
      </div>
    </div>
  </div>
</template>

<style>
.md-editor {
  --md-color: var(--foreground);
  --md-hover-color: var(--hover-foreground);
  --md-bk-color: var(--background);
  --md-bk-color-outstand: var(--bk-color-outstand);
  --md-bk-hover-color: var(--bk-hover-color);
  --md-border-color: var(--border-color);
  --md-border-hover-color: var(--border-hover-color);
  --md-border-active-color: var(--border-active-color);
  --md-modal-mask: var(--modal-mask);
  --md-scrollbar-bg-color: var(--scrollbar-bg-color);
  --md-scrollbar-thumb-color: var(--scrollbar-thumb-color);
  --md-scrollbar-thumb-hover-color: var(--scrollbar-thumb-hover-color);
  --md-scrollbar-thumb-active-color: var(--scrollbar-thumb-active-color);
}

.md-editor-dark {
  --md-color: var(--hover-foreground);
  --md-hover-color: var(--foreground);
  --md-bk-color: var(--background);
  --md-bk-color-outstand: var(--bk-color-outstand);
  --md-bk-hover-color: var(--bk-hover-color);
  --md-border-color: var(--border-color);
  --md-border-hover-color: var(--border-hover-color);
  --md-border-active-color: var(--border-active-color);
  --md-modal-mask: var(--modal-mask);
  --md-scrollbar-bg-color: var(--scrollbar-bg-color);
  --md-scrollbar-thumb-color: var(--scrollbar-thumb-color);
  --md-scrollbar-thumb-hover-color: var(--scrollbar-thumb-hover-color);
  --md-scrollbar-thumb-active-color: var(--scrollbar-thumb-active-color);
}
</style>
