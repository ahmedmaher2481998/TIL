<script setup lang="ts">
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import Button from '@/components/ui/button'
import { createBlogZodSchema } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { FormInputField } from '@/components'
import TagSelector from '@/components/createNewBlog/TagSelector.vue'

const createBlogSchema = toTypedSchema(createBlogZodSchema)
const form = useForm({
  validationSchema: createBlogSchema
})
const { handleSubmit, isFieldValid, isSubmitting, errors } = form
const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
// components 
//   title of page 
//   form { 
//   title 
//   tldr 
//   tags
//   description 
//   content
//   }
//   CTA 
</script>
<template>

  <Card class="max-w-screen-lg mx-auto">
    <CardHeader>
      <CardTitle>Add new blog post</CardTitle>
      <CardDescription>Express your mind freely</CardDescription>
    </CardHeader>
    <Form @submit.prevent="onSubmit">
      <CardContent>
        <FormInputField name="title" placeholder="Subject title...." label="Post title" />
        <FormInputField name="tldr" placeholder="summary of the article" label="Tldr" />
        <FormInputField name="description" placeholder="a sneak peak into post content" label="Description" />
        <TagSelector />
      </CardContent>

      <CardFooter class="flex justify-between px-6 pb-6">
        <Button type="button" variant="outline" siz> Cancel </Button>
        <Button type="submit">Publish</Button>
      </CardFooter>
    </Form>
  </Card>
</template>

<style></style>
