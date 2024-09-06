<script setup lang="ts">
import { CardHeader, CardTitle, Card, CardDescription, CardContent, Label, Button, CardFooter, Input, useToast } from '@/components'
import { notify } from '@/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';


const ChangePasswordSchemaZod = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })
const ChangePasswordSchemaType = toTypedSchema(ChangePasswordSchemaZod)

const {
  handleSubmit,
  values: formValues,
  errors: formErrors
} = useForm({
  validationSchema: ChangePasswordSchemaType
})
const showPassword = ref(false)
const showConfirmPassword = ref(false)
function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}
function onInvalidSubmit({
  errors,
  ..._
}: {
  values: typeof formValues
  errors: typeof formErrors
  _: any
}) {
  notify.error({
    title: 'Uh oh! please make sure all fields are valid.',
    description: `please enter: ${Object.keys(errors).join(', ')}`,

  })
}

async function onSuccess(values: z.infer<typeof registerSchemaZod>) {
  console.log('Login forms values-->', values)
  await register(values)
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)

</script>
<template>

  <form>

    <Card>
      <CardHeader>
        <CardTitle>password</CardTitle>
        <CardDescription>
          change password after saving you will be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-2">
        <div class="space-y-1">
          <Label for="name">Name</Label>
          <Input id="name" default-value="Pedro Duarte" />
        </div>
        <div class="space-y-1">
          <Label for="username">Username</Label>
          <Input id="username" default-value="@peduarte" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save changes</Button>
      </CardFooter>
    </Card>
  </form>

</template>