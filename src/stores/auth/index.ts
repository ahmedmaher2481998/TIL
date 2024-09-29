import supabase, { uploadImageFile } from '@/supabase'
import { Bucket, registerSchemaZod } from '@/types'
import { notify, slugify } from '@/utils'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, type ComputedRef, onBeforeMount, provide, type Reactive, reactive } from 'vue'
import type { z } from 'zod'
import { usePopUp } from '@/stores'
import type {
  Session as SupaBaseSessionType,
  User as SupaBaseUserType
} from '@supabase/supabase-js'
import type { changePasswordType } from './models'
type useAuthStateType = {
  user: SupaBaseUserType | null
  session: SupaBaseSessionType | null
  isAuth: ComputedRef<boolean>
  id: ComputedRef<string>
  name: ComputedRef<string>
  email: ComputedRef<string>
  avatar: ComputedRef<string>
  created_at: ComputedRef<Date | null>
  provider: ComputedRef<string>
}

export const useAuth = defineStore('auth', () => {
  // watchers , reactive State & computed properties
  const { closeCurrentView } = usePopUp()
  const state: Reactive<useAuthStateType> = reactive<useAuthStateType>({
    user: null,
    session: null,
    isAuth: computed(() => {
      if (state.user && state.session) return true
      else return false
    }),
    id: computed(() => state.user?.id ?? ''),
    name: computed(() => state.user?.user_metadata?.name ?? ''),
    email: computed(() => state.user?.email ?? ''),
    avatar: computed(() => state.user?.user_metadata?.avatar ?? ''),
    created_at: computed(() => (state.user?.created_at ? new Date(state.user.created_at) : null)),
    provider: computed(() => state.user?.app_metadata.provider?.toLowerCase() ?? '')
  })

  // ------------------ mutations & actions  ---------------
  onBeforeMount(async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (sessionError) {
      return
    } else if (userError) {
      return
    } else {
      state.session = sessionData.session
      state.user = userData.user
    }
  })
  async function login({ email, password }: { email: string; password: string }) {
    const { data: loginResponse, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      // notify.error({ description: error.message, title: "couldn't signing in" })
      throw error
    } else {
      notify.success({
        description: 'welcome back ' + loginResponse.user.user_metadata.name,
        title: 'logged in successfully'
      })
      state.user = loginResponse.user
      state.session = loginResponse.session
      closeCurrentView()
    }
  }
  async function logout() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      notify.error({ description: error.message, title: 'logging out' })
    } else {
      state.user = null
      state.session = null
      notify.success({
        title: 'you are now logged-out',
        description: 'we will miss you.'
      })
    }
    closeCurrentView()
  }
  async function register(params: z.infer<typeof registerSchemaZod>) {
    const { avatar, email, name, password } = params
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          avatar: '', //url,
          avatar_id: '' //id
        }
      }
    })
    state.session = data.session
    if (error) {
      // notify.error({
      //   description: error.message,
      //   title: "couldn't register"
      // })
      throw error
    } else {
      const { id, url } = await uploadImageFile({
        img: avatar,
        str: slugify(name),
        type: 'avatar' as const // 'avatar' is the type of user profile image
      })

      const { data: userDataWithAvatar } = await supabase.auth.updateUser({
        data: {
          avatar: url,
          avatar_id: id
        }
      })
      state.user = userDataWithAvatar.user
      closeCurrentView()
      notify.success({
        title: 'welcome to the family',
        description: 'your new account is ready.'
      })
    }
  }
  async function loginWithGoogle() {
    closeCurrentView()
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: import.meta.env.PROD ? 'https://todayilearn.vercel.app/' : 'http://localhost:3000'
      }
    })

    if (error) {
      notify.error({ description: error.message, title: "couldn't signing in" })
    }
    // else {
    //   notify.success({
    //     description: 'welcome back ' + loginResponse.user.user_metadata.name,
    //     title: 'logged in successfully'
    //   })
    //   state.user = loginResponse.user
    //   state.session = loginResponse.session
    //   closeCurrentView()
    // }
  }
  async function changeName(name: string) {
    if (state.provider === "email") {
      const { error: changeNameError } = await supabase.auth.updateUser({
        data: { name }
      })
      if (changeNameError) {
        throw changeNameError
      }
      const res = await supabase.auth.getUser()
      state.user = res.data.user
    } else {
      notify.error({ description: 'Action failed', title: "you are using Auth provider." })
    }
  }
  async function changePassword({ confirmPassword, password }: changePasswordType) {
    if (confirmPassword !== password) {
      notify.error({ description: "Passwords don't match", title: "Password mismatch" })
      return
    }
    if (state.provider === "email") {
      const { error: changePAsswordError } = await supabase.auth.updateUser({ password })
      if (changePAsswordError) {
        throw changePAsswordError
      }
      const { error: logOutError } = await supabase.auth.signOut()
      if (logOutError) {
        throw logOutError
      }
      state.user = null
      state.session = null

      closeCurrentView()
    } else {
      notify.error({ description: 'Action failed', title: "you are using Auth provider." })
    }
  }
  async function changeAvatar(avatar: File) {
    // delete the old avatar
    const oldFilePath = `avatars/${state.avatar.split('/').pop()}`
    const { data: DeletePreviousAvatarResponse, error: DeletePreviousAvatarError } = await supabase
      .storage
      .from(Bucket)
      .remove([oldFilePath])

    if (DeletePreviousAvatarError) throw DeletePreviousAvatarError
    // upload the new avatar
    const { id, url } = await uploadImageFile({
      img: avatar,
      str: slugify(state.name),
      type: 'avatar' as const // 'avatar' is the type of user profile image
    })
    // update the user's avatar in the database
    const { data: userDataWithAvatar, error: updateUserError } = await supabase.auth.updateUser({
      data: {
        avatar: url,
        avatar_id: id
      }
    })
    if (updateUserError) throw updateUserError

    state.user = userDataWithAvatar.user


  }
  return {
    changeAvatar,
    login,
    logout,
    register,
    loginWithGoogle,
    changePassword,
    changeName,
    AuthStoreState: state
  }
})
