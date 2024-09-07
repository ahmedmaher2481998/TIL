<script setup lang="ts">
import { CardHeader, CardTitle, Card, CardDescription, CardContent, Label, Button, CardFooter, Input, useToast, FormInputField } from '@/components'
import { useAuth } from '@/stores';
import { notify } from '@/utils';
import { toTypedSchema } from '@vee-validate/zod';
import { VisibilityOffOutlined, VisibilityOutlined } from '@vicons/material';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';
const { changePassword } = useAuth()
const changePasswordError = ref<null | string>(null);
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
function onInvalidSubmit({ errors }: any) {
  changePasswordError.value = `please enter: ${Object.keys(errors).join(', ')}`
}

async function onSuccess(values: z.infer<typeof ChangePasswordSchemaZod>) {
  try {

    await changePassword(values)
  } catch (error: any) {
    changePasswordError.value = error.message
  }
}

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
        <div>

          <FormInputField field-name="password" placeholder="xxxx-xxxx" field-label="password *"
            :type="showPassword ? 'text' : 'password'" description="password must be more than 8 chars "
            inputClasses="bg-secondary text-muted" :required="true">
            <template #afterInput>
              <span class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined v-if="showPassword" class="size-6 text-muted" @click="toggleShowPassword" />
                  <VisibilityOutlined class="size-6 text-muted" v-else @click="toggleShowPassword" />
                </transition>
              </span>
            </template>
          </FormInputField>

        </div>
        <div>

          <FormInputField field-name="confirmPassword" placeholder="xxxx-xxxx" field-label="confirmPassword *"
            :type="showConfirmPassword ? 'text' : 'password'" description="password must be more than 8 chars "
            inputClasses="bg-secondary text-muted" :required="true">
            <template #afterInput>
              <span class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined v-if="showConfirmPassword" class="size-6 text-muted"
                    @click="toggleShowConfirmPassword" />
                  <VisibilityOutlined class="size-6 text-muted" v-else @click="toggleShowConfirmPassword" />
                </transition>
              </span>
            </template>
          </FormInputField>
        </div>
      </CardContent>
      <CardFooter>
        <Button>save changes</Button>
      </CardFooter>
    </Card>
  </form>

</template>