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
  TransitionWrapper
} from '@/components';
import { useAuth } from '@/stores';
import { registerSchemaZod } from '@/types';
import { toTypedSchema } from '@vee-validate/zod';
import { Eye, EyeIcon, EyeOff, EyeOffIcon } from 'lucide-vue-next';
import { useForm } from 'vee-validate';
import { ref } from 'vue';
import { z } from 'zod';
const { register } = useAuth()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerSchemaType = toTypedSchema(registerSchemaZod)
const registerError = ref<null | string>(null)
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
  <!-- <DialogContent class="sm:max-w-[425px] w-full border-muted  text-secondary"> -->
  <form @submit="onSubmit" keep-values class="w-full">

    <div class="w-full space-y-3 mb-4">
      <p data-testid="form-errors-display" class="text-sm font-medium text-destructive" v-if="registerError">
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
              <TransitionWrapper>
                <EyeOffIcon data-testid="password-eye-off-1" v-if="showPassword" class="size-6 text-foreground "
                  @click="toggleShowPassword" />
                <EyeIcon data-testid="password-eye-1" class="size-6 text-foreground " v-else
                  @click="toggleShowPassword" />
              </TransitionWrapper>
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
              <TransitionWrapper>
                <EyeOff data-testid="password-eye-off-2" v-if="showConfirmPassword" class="size-6 text-foreground "
                  @click="toggleShowConfirmPassword" />
                <Eye data-testid="password-eye-2" class="size-6 text-foreground " v-else
                  @click="toggleShowConfirmPassword" />
              </TransitionWrapper>
            </span>
          </template>
        </FormInputField>
      </div>
    </div>
    <div class="flex flex-col  justify-center items-center gap-3">
      <Button type="submit" class="w-full"> Register </Button>
      <Separator label="Or" />
      <LoginWithGoogleComponent />
    </div>
  </form>
  <!-- </DialogContent> -->
</template>
