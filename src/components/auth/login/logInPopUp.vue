<script setup lang="ts">
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  FormInputField,
  LoginWithGoogleComponent,
  Separator,
} from '@/components'
import { Eye, EyeOff } from 'lucide-vue-next';
import { useAuth } from '@/stores'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { ref } from 'vue'

/*----------------------------End of imports ------------------------------------*/

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
    email: '',
    password: ''
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
}

async function onSuccess(values: z.infer<typeof loginSchemaZod>) {
  try {
    await login({
      email: values.email,
      password: values.password
    })

  } catch (error: any) {
    if (loginError.value === error.message) {
      loginError.value = 'try again,' + loginError.value
    } else loginError.value = error.message
  }
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
</script>
<template>
  <form @submit="onSubmit" keep-values class="w-full">
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
                <EyeOff v-if="showPassword" class="size-6 text-foreground" @click="toggleShowPassword" />
                <Eye v-else class="size-6 text-foreground " @click="toggleShowPassword" />
              </transition>
            </span>
          </template>
        </FormInputField>
      </div>
    </div>
    <div class="flex items-center justify-center gap-3 flex-col">
      <Button type="submit" class="w-full"> login </Button>
      <Separator label="Or" class="" />
      <LoginWithGoogleComponent />
    </div>
  </form>
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
