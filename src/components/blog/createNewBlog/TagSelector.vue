<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { useTags } from '@/stores'
import { TagChip, CreateNewTagPopOver, FormItem, FormMessage, Badge } from '@/components'
import { Field } from 'vee-validate'
import { storeToRefs } from 'pinia'
const selectedTags = ref<OptionType[]>([])
type OptionType = { value: number; name: string }
const tagStore = useTags()
const { tags } = storeToRefs(tagStore)
const options = computed<OptionType[]>(() => tags.value.tags.map((t) => ({ name: t.title, value: t.id })))
onBeforeMount(() => {
  tagStore.getAllTags()
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
      <label class="typo__label" :class="{ 'text-red-600': errors.length }">Tags </label>
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
    <p v-if="selectedTags.length" class="text-sm text-secondary-foreground/80 mb-2">
      click on tag to remove it .
    </p>
    <div class="flex space-x-2 justify-start  mb-4 items-center">
      <Badge :key="tag.value" v-for="tag in selectedTags" class="cursor-pointer px-2" variant="destructive"
        @click="() => removeTag(tag.value)" :title="`click to remove ${tag.name}`">
        {{ tag.name }}
      </Badge>
    </div>
  </div>
</template>
<!-- Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
<style>
.multiselect__input,
.multiselect__single,
.multiselect__tags,
.multiselect__current,
.multiselect__select {
  background: hsl(var(--secondary));
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}

.multiselect__tag {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.multiselect__tag-icon::after {
  color: hsl(var(--primary-foreground));
}

.multiselect__tag-icon:hover::after {
  color: hsl(var(--foreground));
}

.multiselect__option--highlight {
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.multiselect__option--selected {
  background: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}

.multiselect__option--selected.multiselect__option--highlight {
  background: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}

.multiselect__option {
  padding: 12px;
  min-height: 40px;
  background-color: hsl(var(--card));
  color: hsl(var(--foreground));
  cursor: pointer;
  white-space: nowrap;
}

.multiselect__option:hover {
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}

.multiselect__option--highlight::after {
  color: hsl(var(--primary));
  background-color: hsl(var(--primary-foreground));
}

.multiselect__option--highlight {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.multiselect__option--selected {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  font-weight: bold;
}

.multiselect__option--selected:hover {
  background-color: hsl(var(--destructive));
  color: hsl(var(--destructive-foreground));
}
</style>
