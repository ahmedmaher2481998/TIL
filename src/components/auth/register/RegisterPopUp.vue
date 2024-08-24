<script setup lang="ts">
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormInputField,
  ImageUpload,
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

async function onSuccess(values: z.infer<typeof registerSchemaZod>) {
  console.log('Login forms values-->', values)
  await register(values)
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
</script>

<template>
  <DialogContent class="sm:max-w-[425px] w-full">
    <form @submit="onSubmit" keep-values class="w-full">
      <DialogHeader>
        <DialogTitle>register new account</DialogTitle>
        <DialogDescription>
          to view your personalized content , experience ,explore and write your fav content.
        </DialogDescription>
      </DialogHeader>

      <div class="w-full space-y-3 mb-4">
        <div>
          <ImageUpload name="avatar" title="profile picture" displayClasses="h-32 w-auto" />
        </div>
        <div>
          <FormInputField
            field-name="name"
            placeholder="john doe"
            field-label="Name *"
            type="text"
            :required="true"
          />
        </div>
        <div>
          <FormInputField
            field-name="email"
            placeholder="username@email.com"
            field-label="Email *"
            type="email"
            :required="true"
          />
        </div>
        <div>
          <FormInputField
            field-name="password"
            placeholder="xxxx-xxxx"
            field-label="password *"
            :type="showPassword ? 'text' : 'password'"
            description="password must be more than 8 chars "
            inputClasses="pr-10"
            :required="true"
          >
            <template #afterInput>
              <span
                class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2"
              >
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined
                    v-if="showPassword"
                    class="size-6 text-muted-foreground"
                    @click="toggleShowPassword"
                  />
                  <VisibilityOutlined
                    class="size-6 text-muted-foreground"
                    v-else
                    @click="toggleShowPassword"
                  />
                </transition>
              </span>
            </template>
          </FormInputField>
        </div>

        <div>
          <FormInputField
            field-name="confirmPassword"
            placeholder="xxxx-xxxx"
            field-label="confirm password *"
            :type="showConfirmPassword ? 'text' : 'password'"
            inputClasses="pr-10"
            :required="true"
            description="this password must match the previous password"
          >
            <template #afterInput>
              <span
                class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2"
              >
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined
                    v-if="showConfirmPassword"
                    class="size-6 text-muted-foreground"
                    @click="toggleShowConfirmPassword"
                  />
                  <VisibilityOutlined
                    class="size-6 text-muted-foreground"
                    v-else
                    @click="toggleShowConfirmPassword"
                  />
                </transition>
              </span>
            </template>
          </FormInputField>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit"> Register </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</template>
