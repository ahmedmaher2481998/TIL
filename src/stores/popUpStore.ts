import { type UserType, type ViewType } from '@/types'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import {
  LoginPopUp, LogoutPopUp, RegisterPopUp
} from '@/components'
export const usePopUp = defineStore('popUp', () => {
  const view = ref<ViewType | null>(null)
  const open = ref<boolean>(false)
  const viewComponent = computed(() => {
    switch (view.value) {
      case 'login':
        return LoginPopUp
      case 'register ':
        return RegisterPopUp
      case 'addNewTag':
        return null
      case 'logout':
        return LogoutPopUp
      default:
        return null
    }
  })
  function openView(openedView: ViewType) {
    open.value = true
    view.value = openedView

  }
  function closeCurrentView() {
    open.value = false;
  }
  return {
    view, openView, closeCurrentView, open, viewComponent
  }
})
