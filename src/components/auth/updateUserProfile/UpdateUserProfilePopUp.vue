<script setup lang="ts">
import { updateProfileTabs } from './updateProfileTabs.enum'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  DialogContent,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  useToast
  // ,ChangeAvatarTab, ChangePasswordTab, ChangeProfileName
} from '@/components'
import { useAuth } from '@/stores'
import { registerSchemaZod } from '@/types'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { z } from 'zod'
const { register } = useAuth()
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registerSchemaType = toTypedSchema(registerSchemaZod)
const { toast } = useToast()
const { AuthStoreState } = storeToRefs(useAuth())
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
  ..._
}: {
  values: typeof formValues
  errors: typeof formErrors
  _: any
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
  <DialogContent
    class="sm:max-w-[425px] md:max-w-lg flex justify-center items-center w-full border-muted-foreground bg-foreground text-muted">
    <Tabs default-value="name" class="w-full mt-6">
      <TabsList class="flex justify-between items-center w-full ">
        <TabsTrigger :value="updateProfileTabs.name" class='capitalize w-full '>
          {{ updateProfileTabs.name }}
        </TabsTrigger>
        <TabsTrigger :value="updateProfileTabs.password" v-if="AuthStoreState.provider === 'email'"
          class='capitalize w-full '>
          {{ updateProfileTabs.password }}
        </TabsTrigger>
        <TabsTrigger :value="updateProfileTabs.avatar" class='capitalize w-full '>
          {{ updateProfileTabs.avatar }}
        </TabsTrigger>
      </TabsList>
      <TabsContent :value="updateProfileTabs.name">
        name
      </TabsContent>
      <TabsContent v-if="AuthStoreState.provider === 'email'" :value="updateProfileTabs.password">
        password
      </TabsContent>
      <TabsContent :value="updateProfileTabs.avatar">
        avatar
      </TabsContent>

    </Tabs>

    <!-- <form @submit="onSubmit" keep-values class="w-full">
      <DialogHeader>
        <DialogTitle>update profile data</DialogTitle>
        <DialogDescription>
          you can change your display name ,avatar and password
        </DialogDescription>
      </DialogHeader>

      <div class="w-full space-y-3 mb-4">
        <div>
          <ImageUpload name="avatar" title="profile picture" displayClasses="h-32 w-auto" />
        </div>
        <div>
          <FormInputField field-name="name" placeholder="john doe" field-label="Name *" type="text" :required="true" />
        </div>
        <div>
          <FormInputField field-name="email" placeholder="username@email.com" field-label="Email *" type="email"
            :required="true" />
        </div>
        <div>
          <FormInputField field-name="password" placeholder="xxxx-xxxx" field-label="password *"
            :type="showPassword ? 'text' : 'password'" description="password must be more than 8 chars "
            inputClasses="bg-secondary-foreground text-muted" :required="true">
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

<div>
  <FormInputField field-name="confirmPassword" placeholder="xxxx-xxxx" field-label="confirm password *"
    :type="showConfirmPassword ? 'text' : 'password'" inputClasses="pr-10" :required="true"
    description="this password must match the previous password">
    <template #afterInput>
              <span class="absolute cursor-pointer end-0 inset-y-0 flex items-center justify-center px-2">
                <transition name="fade" mode="out-in">
                  <VisibilityOffOutlined v-if="showConfirmPassword" class="size-6 text-muted-foreground"
                    @click="toggleShowConfirmPassword" />
                  <VisibilityOutlined class="size-6 text-muted-foreground" v-else @click="toggleShowConfirmPassword" />
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
</form> -->
  </DialogContent>
</template>
