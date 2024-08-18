import supabase, { uploadImageFile } from '@/supabase'
import { registerSchemaZod, type UserType } from '@/types'
import { notify, slugify } from '@/utils'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, onBeforeMount, reactive, ref } from 'vue'
import type { z } from 'zod'
import { usePopUp } from './popUpStore'
import type {
  Session as SupaBaseSessionType,
  User as SupaBaseUserType
} from '@supabase/supabase-js'

export const useAuth = defineStore('auth', () => {
  const user = ref<any | null>(null)
  const session = ref<SupaBaseSessionType | null>(null)

  const isAuth = computed(() => {
    if (user.value && session.value) return true
    else return false
  })
  function getUserDataFromUserObject(user: SupaBaseUserType) {
    return {
      id: user.id,
      name: user.user_metadata.name,
      email: user.email,
      avatar: user.user_metadata.avatar,
      createdAt: new Date(user.created_at)
    } as UserType
  }
  onBeforeMount(async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (sessionError) {
      console.log('error getting session', sessionError)
      return
    }
    if (userError) {
      console.log('error getting session', userError)
      return
    }
    session.value = sessionData.session
    user.value = getUserDataFromUserObject(userData.user)
    console.log(',mounted and session ', session.value, 'user', user.value)
  })
  const { closeCurrentView } = usePopUp()
  // async function loginWithGoogle() {
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: 'google'
  //   })
  // }
  async function login({ email, password }: { email: string; password: string }) {
    const { data: loginResponse, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      notify.error({ description: error.message, title: 'signing in' })
    } else {
      // @ts-ignore
      console.log('loginResponse', loginResponse)
      user.value = getUserDataFromUserObject(loginResponse.user)
      session.value = loginResponse.session
      closeCurrentView()
      console.log('login data ', loginResponse, user)
    }
  }
  async function logout() {
    const { error } = await supabase.auth.signOut()
    user.value = null
    session.value = null
    if (error) {
      console.log('log out error', error)
      notify.error({ description: error.message, title: 'logging out' })
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
    if (error) {
      notify.error({
        description: error.message,
        title: "couldn't register"
      })
      console.log('error register', error.message)
    } else {
      // console.log('success registered', data)
      const { id, url } = await uploadImageFile({
        img: avatar,
        str: slugify(name),
        type: 'avatar' as const // 'avatar' is the type of user profile image
      })

      await supabase.auth.updateUser({
        data: {
          avatar: url,
          avatar_id: id
        }
      })

      user.value = {
        name: data.user?.user_metadata.name as string,
        avatar: url as string,
        createdAt: new Date(data.user?.created_at as string) as Date,
        email: data.user?.email as string,
        id: data.user?.id as string
      }

      closeCurrentView()
    }
  }
  return {
    login,
    logout,
    register,
    isAuth,
    user
  }
})
