<script setup lang="ts">
// TODO
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormInputField,
  TagSelector,
  ImageUpload,
  Button,
  MarkDownContentInput,
  FormField,
  useToast
} from '@/components'
import { createBlogZodSchema } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { slugify } from '@/utils'
import { computed, watch } from 'vue'
import { useBlogs } from '@/stores/blogsStore'
import type { z } from 'zod'

const defaultBlogData = {
  slug: '',
  title: '',
  description: '',
  tldr: '',
  content: '',
  tags: undefined,
  image: undefined,
  readCount: 0,
  author_id: 1
}
const { toast } = useToast()
const createBlogSchema = toTypedSchema(createBlogZodSchema)
const {
  handleSubmit,
  values: formValues,
  resetForm,
  setFieldValue,
  errors: formErrors
} = useForm({
  validationSchema: createBlogSchema,
  initialValues: defaultBlogData
})

function onInvalidSubmit({
  errors,
  ...rest
}: {
  values: typeof formValues
  errors: typeof formErrors
  rest: any
}) {
  toast({
    title: 'Uh oh! please make sure all fields are valid.',
    description: `please enter: ${Object.keys(errors).join(', ')}`,
    variant: 'destructive'
  })
}

const { CreateBlogPost } = useBlogs()
async function onSuccess(values: z.infer<typeof createBlogZodSchema>) {
  await CreateBlogPost(values)

  console.log('Form submitted!', values)
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
// create slug out of the title onchange
watch(formValues, () => {
  setFieldValue('slug', slugify(formValues.title ?? ''), true)
})
</script>

<template>
  <Card class="max-w-screen-lg mx-auto px-4">
    <CardHeader>
      <CardTitle>Add new blog post</CardTitle>
      <CardDescription>Give your ideas the exposure it deserve</CardDescription>
    </CardHeader>
    <form @submit="onSubmit" keep-values>
      <CardContent class="space-y-4">
        <!-- Form Fields -->
        <!-- blog Title / slug  -->
        <FormInputField
          field-name="title"
          placeholder="Subject title...."
          field-label="Post title"
        />

        <!-- blog Tldr -->
        <FormInputField field-name="tldr" placeholder="summary of the article" field-label="Tldr" />
        <!-- blog Description -->
        <FormInputField
          field-name="description"
          placeholder="a sneak peak into post content"
          field-label="Description"
        />
        <!-- blog tag Selector  -->
        <TagSelector />
        <!-- Upload blog cover  -->
        <ImageUpload title="Blog Cover" name="picture" />
        <!-- write markdown blog Content -->
        <MarkDownContentInput />
      </CardContent>
      <CardFooter class="flex mt-10 justify-between px-6 pb-6">
        <Button type="button" variant="destructive" @click="resetForm"> clear </Button>
        <Button type="submit">Publish</Button>
      </CardFooter>
    </form>
  </Card>
</template>

<style></style>
