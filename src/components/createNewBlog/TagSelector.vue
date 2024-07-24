<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { useTags } from '@/stores/TagsStore'
import { TagChip, CreateNewTagPopOver, FormItem, FormMessage } from '@/components'
import { Field } from 'vee-validate'
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
    <!-- vue multi select component lib  -->
    <Field name="tags" v-slot="{ field, errors }">

      <label class="typo__label " :class="{ 'text-red-600': errors.length }">Select tags </label>
      <FormItem>
        <div class="flex justify-center items-center gap-2">
          <multiselect v-model="selectedTags" v-bind="field" :options="options" :multiple="true"
            :close-on-select="false" :clear-on-select="true" :preserve-search="false" placeholder="search .."
            label="name" track-by="name" :hideSelected="true" :max="5" :min="1">
            <template #selection="selection">
              <span class="multiselect__single" v-if="selection.values.length" v-show="!selection.isOpen">
                {{ displaySelectedValuesAsString }}
              </span>
            </template>
          </multiselect>
          <CreateNewTagPopOver />
        </div>
        <FormMessage />
      </FormItem>
    </Field>
    <!-- Displaying selected values as chips and it can be removed when click on it  -->
    <div class="flex space-x-2 justify-start mb-4 items-center">
      <TagChip :key="tag.value" v-for="tag in selectedTags" variant="default" :click="{
        linked: false,
        onClickHandler: () => removeTag(tag.value)
      }" :name="tag.name" />
    </div>
  </div>


</template>
<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
