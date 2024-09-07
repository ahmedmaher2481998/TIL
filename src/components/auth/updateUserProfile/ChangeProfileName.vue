<script setup lang="ts">
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, FormInputField } from '@/components';
import { useAuth } from '@/stores';
import { notify } from '@/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';
const { changeName } = useAuth()
// const { AuthStoreState } = useAuth()
const changeNameError = ref<null | string>(null);
const changeNameSchemaZod = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .refine(
        (value) => {
          const words = value.trim().split(/\s+/)
          return words.length === 2
        },
        {
          message: 'Name must contain your first and last name separated by a space',
          path: ['name']
        }
      )
  })

const changeNameSchemaType = toTypedSchema(changeNameSchemaZod)

const {
  handleSubmit,

} = useForm({
  validationSchema: changeNameSchemaType
})

function onInvalidSubmit({ errors }: any) {
  changeNameError.value = `please enter: ${Object.keys(errors).join(', ')}`
}

async function onSuccess(values: z.infer<typeof changeNameSchemaZod>) {
  try {
    changeNameError.value = ''
    await changeName(values.name)
    notify.success({
      description: 'Name updated successfully',
      title: 'Name changed'
    })
  } catch (error: any) {
    changeNameError.value = error.message
  }
}

const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)

</script>
<template>

  <form>

    <Card as="form">
      <CardHeader>
        <!-- <CardTitle>Display Name</CardTitle> -->
        <CardDescription>
          Update your display name to be easily recognized by others.
        </CardDescription>
      </CardHeader>
      <form @submit="onSubmit">
        <CardContent class="space-y-2">
          <p class="text-sm font-medium text-destructive" v-if="changeNameError">
            {{ changeNameError }}
          </p>
          <div>
            <FormInputField field-name="name" placeholder="john doe" field-label="Name *" type="text" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">save changes</Button>
        </CardFooter>
      </form>
    </Card>
  </form>

</template>