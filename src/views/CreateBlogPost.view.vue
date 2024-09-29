<script setup lang="ts">
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
  useToast, Loader
} from '@/components'
import { createBlogZodSchema } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { notify, slugify } from '@/utils'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useAuth, useBlogs } from '@/stores'
import type { z } from 'zod'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const { AuthStoreState } = storeToRefs(useAuth())
// TODO presist blog if users leaves the page
// localStorage.getItem('blog') ?
const defaultBlogData = {
  title: '',
  tldr: '',
  description:
    "",
  slug: '',
  content: '',
  tags: undefined,
  image: undefined,
  readCount: 1,
  author_id: AuthStoreState.value.id
}
const { toast } = useToast()
const createBlogSchema = toTypedSchema(createBlogZodSchema)
const {
  handleSubmit,
  values: formValues,
  resetForm,
  setFieldValue,
  errors: formErrors,

} = useForm({
  validationSchema: createBlogSchema,
  initialValues: defaultBlogData
})

function onInvalidSubmit({
  // values,
  errors
  // ...rest
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
const loading = ref(false)
async function onSuccess(values: z.infer<typeof createBlogZodSchema>) {
  // localStorage.removeItem('blog')
  loading.value = true
  CreateBlogPost(values).then(res => {
    loading.value = false
    resetForm()
    const slug = res?.slug as string ?? ""
    router.push(`/blog/${slug}`)
  })
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
// create slug out of the title onchange
const router = useRouter()
watch(() => formValues.title, (newTitle) => {
  setFieldValue('slug', slugify(newTitle ?? ''), true)
})
onMounted(() => {
  if (!AuthStoreState.value.isAuth) {
    router.push('/')
  }
  else {
    setFieldValue('author_id', AuthStoreState.value.id, true)
    setFieldValue('slug', '')
  }

})
// TODO 
// onBeforeUnmount(() => {
//   localStorage.setItem('blog_draft', JSON.stringify(formValues))
// })
</script>

<template>


  <Card class="max-w-screen-lg mx-auto px-4">
    <CardHeader>
      <CardTitle>Add new blog post</CardTitle>
      <CardDescription>Give your ideas the exposure it deserve</CardDescription>
    </CardHeader>
    <form @submit="onSubmit" keep-values>
      <CardContent class="space-y-4">
        <!-- blog Title / slug  -->
        <FormInputField field-name="title" placeholder="Subject title...." field-label="Post title" />

        <!-- blog Tldr -->
        <FormInputField field-name="tldr" placeholder="summary of the article" field-label="Tldr" />
        <!-- blog Description -->
        <FormInputField field-name="description" placeholder="a sneak peak into post content"
          field-label="Description" />
        <!-- blog tag Selector  -->
        <TagSelector />
        <!-- Upload blog cover  -->
        <ImageUpload title="Blog Cover" name="image" />
        <!-- write markdown blog Content -->
        <MarkDownContentInput />
      </CardContent>
      <CardFooter class="flex mt-10 justify-between px-6 pb-6">
        <Button :disabled="loading" type="button" variant="destructive" @click="resetForm">
          clear
        </Button>
        <Button :disabled="loading" type="submit">
          Publish
          <Loader v-if="loading" />
        </Button>
      </CardFooter>
    </form>
  </Card>
</template>

<style></style>
