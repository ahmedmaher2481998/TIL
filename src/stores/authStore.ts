import supabase, { uploadImageFile } from '@/supabase'
import { registerSchemaZod, type UserType } from '@/types'
import { getImageUploadPath, slugify } from '@/utils'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { z } from 'zod'
import { usePopUp } from './popUpStore'

export const useAuth = defineStore('auth', () => {
  const isAuth = ref(false)
  const user = ref<UserType | null>(null)
  const { closeCurrentView } = usePopUp()
  async function loginWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }
  async function logIn({ email, password }: { email: string; password: string }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) {
      console.log('error message ', error.message)
    } else {
      // @ts-ignore
      user.value = data.user
      console.log('login up  data ', data)
    }
  }
  async function logout() {
    const { error } = await supabase.auth.signOut()

    console.log('log out error', error)
  }
  async function register({
    avatar,
    email,
    name,
    password
  }: z.infer<typeof registerSchemaZod>) {
    const path = getImageUploadPath({
      img: avatar,
      str: slugify(name),
      type: 'avatar' as const // 'avatar' is the type of user profile image
    }) as string
    const { id, url } = await uploadImageFile(avatar, path)
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
          avatar: url,
          avatar_id: id
        }
      }
    })
    if (error) {
      console.log('error register', error)
    } else {
      console.log('success registered', data)
      isAuth.value = true
      user.value = {
        name: data.user?.user_metadata.name as string,
        avatar: data.user?.user_metadata.avatar as string,
        createdAt: new Date(data.user?.created_at as string) as Date,
        email: data.user?.email as string,
        id: data.user?.id as string,
      }

      closeCurrentView()
    }
  }
  return {
    logIn,
    logout,
    register,
    isAuth,
    user
  }
})
