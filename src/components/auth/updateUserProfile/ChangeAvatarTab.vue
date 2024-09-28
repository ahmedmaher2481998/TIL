<script setup lang="ts">
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, FormItem } from '@/components';
import { useAuth } from '@/stores';
import { notify } from '@/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { UploadIcon } from 'lucide-vue-next';
import { storeToRefs } from 'pinia';
import { useField, useForm } from 'vee-validate';
import { ref, watch, useTemplateRef } from 'vue';
import { z } from 'zod';

const auth = useAuth()
const { AuthStoreState } = storeToRefs(auth);
const changeAvatarError = ref<null | string>(null);
const name = 'avatar';
const imageSrc = ref<string>(AuthStoreState.value.avatar);

const changeAvatarSchemaZod = z.object({
  avatar: z
    .instanceof(File, { message: 'image is required' })
    .refine((file) => file.type.startsWith('image/'), {
      message: 'Image upload failed, file must be an image',
    })
    .refine((f: File) => f.size / (1024 * 1024) < 5, { message: 'max image size is 5mb' })
});

const changeNameSchemaType = toTypedSchema(changeAvatarSchemaZod);

const { handleSubmit, values } = useForm({
  validationSchema: changeNameSchemaType,
});

const { value: fileValue, errorMessage, handleChange, handleBlur } = useField<File | null>(name, undefined, {
  initialValue: null,
});

const inputFile = useTemplateRef('imageUploadRef');
const onImageClick = () => {
  if (inputFile.value) {
    inputFile.value.click();
  }
};

async function onSuccess(values: z.infer<typeof changeAvatarSchemaZod>) {
  try {
    changeAvatarError.value = '';
    await auth.changeAvatar(values.avatar);
    notify.success({
      title: 'Your avatar has been updated',
      description: 'Your new avatar is ready.',
    });
  } catch (error: any) {
    changeAvatarError.value = error.message;
  }
}

function onInvalidSubmit({ errors }: any) {
  changeAvatarError.value = `Please select: ${Object.keys(errors).join(',')}`;
}

const onSubmit = handleSubmit(onSuccess, onInvalidSubmit);

// Display image when it's selected
watch(fileValue, () => {
  if (fileValue.value) {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      imageSrc.value = (e?.target?.result as string) ?? AuthStoreState.value.avatar;
    };
    reader.readAsDataURL(fileValue.value);
  }
});

</script>

<template>
  <Card>
    <form @submit="onSubmit">
      <CardHeader>
        <CardTitle>Click on the image to change your avatar</CardTitle>
        <CardDescription>Max image size is 5mb.</CardDescription>
      </CardHeader>

      <CardContent class="space-y-2">
        <p class="text-sm font-medium text-destructive" v-if="changeAvatarError">
          {{ changeAvatarError }}
        </p>

        <FormItem class="grid justify-start text-foreground space-y-0 mt-8 w-full items-center gap-1.5">
          <!-- Clickable image -->
          <img @click="onImageClick" :src="imageSrc"
            class="shadow-lg rounded-lg object-cover cursor-pointer w-full h-auto" />

          <!-- Display selected file name -->
          <span v-if="fileValue" :class="`text-sm truncate text-center ${fileValue ? 'mt-4' : ''}`">
            {{ fileValue ? fileValue.name : 'Choose image' }}
          </span>
          <Button :for="name" v-if="!imageSrc" variant="outline" size="lg"
            class="cursor-pointer w-full flex items-center" as="label">
            <p class="mr-2">
              Select Image
            </p>
            <UploadIcon />

          </Button>

          <!-- Hidden file input -->
          <input accept="image/*" :id="name" type="file" class="pl-10 cursor-pointer hidden" ref="imageUploadRef"
            @change="handleChange" @blur="handleBlur" />

          <!-- Display error message if exists -->
          <p v-if="Boolean(errorMessage)" class="text-sm font-medium text-destructive">
            {{ errorMessage }}
          </p>
        </FormItem>
      </CardContent>

      <CardFooter v-if="imageSrc">
        <Button type="submit">Upload</Button>
      </CardFooter>
    </form>
  </Card>
</template>
