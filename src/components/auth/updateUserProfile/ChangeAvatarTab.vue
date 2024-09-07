<script setup lang="ts">
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, FormItem, Input } from '@/components';
import { useAuth } from '@/stores';
import { notify } from '@/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { ref, watch, useTemplateRef } from 'vue';
import { z } from 'zod';

const auth = useAuth()
const { AuthStoreState } = storeToRefs(auth)
const changeAvatarError = ref<null | string>(null);
const name = 'avatar'
const imageSrc = ref<string>(AuthStoreState.value.avatar)
const { handleBlur, handleChange, errorMessage, value } = useField<File | null>(name, undefined, {
  initialValue: null
})
const inputFile = useTemplateRef('imageUploadRef')
const onImageClick = () => {
  if (!inputFile.value) return
  inputFile.value.click()
}
const changeAvatarSchemaZod = z
  .object({
    avatar: z
      .instanceof(File, { message: 'image is required' })
      .refine((file) => file.type.startsWith('image/'), {
        message: 'Image upload failed, file must be an image'
      })
      .refine((f: File) => f.size / (1024 * 1024) < 5, { message: 'max image size is 5mb' })

  })
const changeNameSchemaType = toTypedSchema(changeAvatarSchemaZod)
const {
  handleSubmit, values

} = useForm({
  validationSchema: changeNameSchemaType
})
function onInvalidSubmit({ errors }: any) {
  console.log('value is :', value.value instanceof File)
  console.log('errors are :', errors)
  changeAvatarError.value = `please Select : ${Object.keys(errors).join(',')}`
}
async function onSuccess(values: z.infer<typeof changeAvatarSchemaZod>) {
  try {
    changeAvatarError.value = ''
    auth.changeAvatar(values.avatar)
    notify.success({
      title: 'your avatar has been updated',
      description: 'your new avatar is ready.'
    })
  } catch (error: any) {
    changeAvatarError.value = error.message
  }
}
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
// display image when it's selected
watch(value, () => {
  if (value.value) {
    const reader = new FileReader()
    reader.onload = function (e: ProgressEvent<FileReader>) {
      imageSrc.value = (e?.target?.result as string) ?? AuthStoreState.value.avatar
    }
    reader.readAsDataURL(value.value)
  }
})

</script>
<template>

  <Card>
    <form @submit="onSubmit">
      <CardHeader>
        <CardTitle>click on the image to change your avatar</CardTitle>
        <CardDescription>
          max image size is 5mb.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <p class="text-sm font-medium text-destructive" v-if="changeAvatarError">
          {{ changeAvatarError }}
        </p>

        <FormItem class="grid justify-start text-foreground space-y-0 mt-8 w-full items-center gap-1.5">

          <img @click.stop="onImageClick" :src="imageSrc"
            class="shadow-lg rounded-lg object-cover cursor-pointer w-full h-auto" />
          <span v-if="value" :class="`text-sm truncate  text-center ${value ? 'mt-4' : ''}`">
            {{ value ? value.name : 'Choose image' }}
          </span>
          <input accept="image/*" :id="name" type="file" class="pl-10 cursor-pointer hidden" ref="imageUploadRef"
            @change="handleChange" @blur="handleBlur" />
          <p v-if="Boolean(errorMessage)" class="text-sm font-medium text-destructive">
            {{ errorMessage }}
          </p>
        </FormItem>

      </CardContent>
      <CardFooter>
        <Button type="submit">Upload</Button>
      </CardFooter>
    </form>
  </Card>
</template>