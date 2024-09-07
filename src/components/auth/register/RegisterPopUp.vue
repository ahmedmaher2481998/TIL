<script setup lang="ts">
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  FormInputField,
  ImageUpload,
  LoginWithGoogleComponent,
  Separator,
  useToast
} from '@/components'
import { registerSchemaZod } from '@/types'
import { VisibilityOutlined, VisibilityOffOutlined } from '@vicons/material'
import { useForm } from 'vee-validate'
import { useAuth } from '@/stores'
import { toTypedSchema } from '@vee-validate/zod'
import { ref } from 'vue'
import { z } from 'zod'
const { register } = useAuth()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerSchemaType = toTypedSchema(registerSchemaZod)
const registerError = ref<null | string>(null)
const { toast } = useToast()
function toggleShowPassword() {
  showPassword.value = !showPassword.value
}

function toggleShowConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}

const {
  handleSubmit,
  values: formValues,
  errors: formErrors
} = useForm({
  validationSchema: registerSchemaType
})

function onInvalidSubmit({
  errors
}: {
  values: typeof formValues
  errors: typeof formErrors
  _: any
}) {
  registerError.value = `please enter: ${Object.keys(errors).join(', ')}`
  // toast({
  //   title: 'Uh oh! please make sure all fields are valid.',
  //   description: `please enter: ${Object.keys(errors).join(', ')}`,
  //   variant: 'destructive'
  // })
}

async function onSuccess(values: z.infer<typeof registerSchemaZod>) {
  try {
    await register(values)

  } catch (error: any) {
    if (registerError.value === error.message) {
      registerError.value = 'try again,' + registerError.value
    } else registerError.value = error.message
  }
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
</script>

<template>
  <DialogContent class="sm:max-w-[425px] w-full border-muted  text-secondary">
    <form @submit="onSubmit" keep-values class="w-full">
      <DialogHeader>
        <DialogTitle>register new account</DialogTitle>
        <DialogDescription>
          to view your personalized content , experience ,explore and write your fav content.
        </DialogDescription>
      </DialogHeader>

      <div class="w-full space-y-3 mb-4">
        <p class="text-sm font-medium text-destructive" v-if="registerError">
          {{ registerError }}
        </p>

        <div>
          <ImageUpload name="avatar" title="profile picture" displayClasses="h-32 w-auto" />
        </div>
        <div>
          <FormInputField field-name="name" placeholder="john doe" field-label="Name *" type="text" />
        </div>

        <div>
          <FormInputField field-name="email" placeholder="username@email.com" field-label="Email *" type="email" />
        </div>
        <div>
          <FormInputField field-name="password" placeholder="*****" field-label="password *"
            :type="showPassword ? 'text' : 'password'" description="password must be more than 8 chars " inputClasses=""
            :required="true">
            <template #afterInput>
              <span class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined v-if="showPassword" class="size-6 text-foreground "
                    @click="toggleShowPassword" />
                  <VisibilityOutlined class="size-6 text-foreground " v-else @click="toggleShowPassword" />
                </transition>
              </span>
            </template>
          </FormInputField>
        </div>

        <div>
          <FormInputField field-name="confirmPassword" placeholder="*****" field-label="confirm password *"
            :type="showConfirmPassword ? 'text' : 'password'" inputClasses="pr-10" :required="true"
            description="this password must match the previous password">
            <template #afterInput>
              <span class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined v-if="showConfirmPassword" class="size-6 text-foreground "
                    @click="toggleShowConfirmPassword" />
                  <VisibilityOutlined class="size-6 text-foreground " v-else @click="toggleShowConfirmPassword" />
                </transition>
              </span>
            </template>
          </FormInputField>
        </div>
      </div>
      <div class="flex flex-col bg-green justify-center items-center gap-3">
        <Button type="submit" class="w-full"> Register </Button>
        <Separator label="Or" />
        <LoginWithGoogleComponent />
      </div>
    </form>
  </DialogContent>
</template>
