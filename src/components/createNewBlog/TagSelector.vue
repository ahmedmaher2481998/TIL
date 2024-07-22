<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { useTags } from '@/stores/TagsStore'

import { TagChip, CreateNewTagPopOver } from '@/components'
import Button from '@/components/ui/button'
const selectedTags = ref<OptionType[]>([])
type OptionType = { value: number; name: string }
const { getAllTags, tags } = useTags()
const options = computed<OptionType[]>(() => tags.tags.map((t) => ({ name: t.title, value: t.id })))
onBeforeMount(() => {
  getAllTags()
})
const displaySelectedValuesAsString = computed(() => {
  return selectedTags.value.map((option: OptionType) => option.name).join(', ')
})
const removeTag = (id: number) => {
  selectedTags.value = selectedTags.value.filter((t) => t.value !== id)
}
</script>

<template>
  <div>
    <label class="typo__label">Select tags </label>
    <multiselect v-model="selectedTags" :options="options" :multiple="true" :close-on-select="false"
      :clear-on-select="false" :preserve-search="false" placeholder="search .." label="name" track-by="name"
      :preselect-first="true" :hideSelected="true" :max="5">
      <template #selection="selection">
        <span class="multiselect__single" v-if="selection.values.length" v-show="!selection.isOpen">
          {{ displaySelectedValuesAsString }}
        </span>
      </template>
    </multiselect>
    <div class="flex space-x-2 justify-start mt-2 items-center">
      <TagChip :key="tag.value" v-for="tag in selectedTags" variant="default" :click="{
        linked: false,
        onClickHandler: () => removeTag(tag.value)
      }" :name="tag.name" />
    </div>
  </div>

  <CreateNewTagPopOver />
</template>
<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
