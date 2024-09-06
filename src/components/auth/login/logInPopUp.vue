<script setup lang="ts">
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  FormInputField,
  LoginWithGoogleComponent,
  Separator,
  useToast, FormMessage
} from '@/components'
import { VisibilityOutlined, VisibilityOffOutlined } from '@vicons/material'
import { useAuth } from '@/stores'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { ref } from 'vue'
import { notify } from '@/utils'
const loginSchemaZod = z.object({
  email: z.string().email('invalid email').min(1, 'Email is required'),
  password: z.string().min(8, 'password must be at least 8 characters long')
})
const loginSchemaType = toTypedSchema(loginSchemaZod)
const { login } = useAuth()
const loginError = ref<null | string>(null)
const showPassword = ref(false)
function toggleShowPassword() {
  showPassword.value = !showPassword.value
}
const {
  handleSubmit,
  values: formValues,
  errors: formErrors
} = useForm({
  validationSchema: loginSchemaType,
  initialValues: {
    email: 'ahmedmaher@gmail.com',
    password: '123123123'
  }
})

function onInvalidSubmit({
  errors
}: {
  values: typeof formValues
  errors: typeof formErrors
  rest: any
}) {
  loginError.value = `please enter: ${Object.keys(errors).join(', ')}`
  // notify.error({
  //   title: 'Uh oh! please make sure all fields are valid.',
  //   description: `please enter: ${Object.keys(errors).join(', ')}`
  // })
}

async function onSuccess(values: z.infer<typeof loginSchemaZod>) {
  console.log('Login forms values-->', values)
  try {
    await login({
      email: values.email,
      password: values.password
    })

  } catch (error: any) {
    console.log("🚀 ~ onSuccess ~ error.message:", error.message)
    if (loginError.value === error.message) {
      loginError.value = 'try again,' + loginError.value
    } else loginError.value = error.message
  }
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
</script>

<template>
  <DialogContent class="sm:max-w-[425px] border-muted-foreground bg-foreground text-muted">
    <form @submit="onSubmit" keep-values class="w-full">
      <DialogHeader>
        <DialogTitle>login to your account</DialogTitle>
        <DialogDescription>
          to view your personalized content , experience ,explore and write your fav content.
        </DialogDescription>
      </DialogHeader>

      <div class="w-full space-y-3 mb-4">
        <p class="text-sm font-medium text-destructive" v-if="loginError">
          {{ loginError }}
        </p>
        <div>
          <FormInputField field-name="email" placeholder="username@email.com" field-label="Email *" type="email"
            :required="true" />
        </div>
        <div class="">
          <FormInputField field-name="password" placeholder="*****" field-label="password *"
            :type="showPassword ? 'text' : 'password'" inputClasses="pr-10" :required="true">
            <template #afterInput>
              <span class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined v-if="showPassword" class="size-6 text-muted-foreground"
                    @click="toggleShowPassword" />
                  <VisibilityOutlined class="size-6 text-muted-foreground" v-else @click="toggleShowPassword" />
                </transition>
              </span>
            </template>
          </FormInputField>
        </div>
      </div>
      <div class="flex items-center justify-center gap-3 flex-col">
        <Button type="submit" class="w-full"> login </Button>
        <Separator label="Or" class="bg-muted" />
        <LoginWithGoogleComponent />
      </div>
    </form>
  </DialogContent>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  scale: 0.8;
  /* transform: translateX(20px); */
}
</style>
