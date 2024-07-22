<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormInputField,
  FormControl,
  TagSelector,
  ImageUpload, Button, Form, MarkDownContentInput,
} from '@/components'
import { createBlogZodSchema } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'


const createBlogSchema = toTypedSchema(createBlogZodSchema)
const form = useForm({
  validationSchema: createBlogSchema
})
const { handleSubmit, resetForm } = form
const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
})
// content 
// validate data
//  submitting 
// redirecting to the blog page 
// auth 
</script>
<template>
  <Card class="max-w-screen-lg mx-auto px-4">
    <CardHeader>
      <CardTitle>Add new blog post</CardTitle>
      <CardDescription>Give your ideas the exposure it deserve</CardDescription>
    </CardHeader>
    <Form @submit.prevent="onSubmit">
      <CardContent class="space-y-4">
        <!-- Form Fields  -->
        <!-- blog Title -->
        <FormInputField name="title" placeholder="Subject title...." label="Post title" />
        <!-- blog Tldr -->
        <FormInputField name="tldr" placeholder="summary of the article" label="Tldr" />
        <!-- blog Description -->
        <FormInputField name="description" placeholder="a sneak peak into post content" label="Description" />
        <!-- blog tag Selector  -->
        <TagSelector />
        <!-- Upload blog cover  -->
        <ImageUpload />
        <!-- write markdown blog Content -->
        <MarkDownContentInput />
      </CardContent>
      <CardFooter class="flex mt-10 justify-between px-6 pb-6">
        <Button type="button" variant="destructive" @click="resetForm"> clear </Button>
        <Button type="submit">Publish</Button>
      </CardFooter>
    </Form>
  </Card>
</template>

<style></style>
