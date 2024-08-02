import { type UserType } from '@/types'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuth = defineStore('auth', () => {
  const isAuth = ref(false)
  const user = ref<UserType | null>(null)
  async function logIn() {
    console.log("log in start")
  }
  async function logout() {
    console.log("log out start")
  }
  async function register() {
    console.log("register start")
  }

  return {
    logIn, logout, register, isAuth, user
  }
})
