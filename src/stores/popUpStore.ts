import { type ViewType } from '@/types'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { LoginPopUp, LogoutPopUp, RegisterPopUp } from '@/components'
export const usePopUp = defineStore('popUp', () => {
  const view = ref<ViewType | null>(null)
  const open = ref<boolean>(false)
  const viewComponent = computed(() => {
    const openedView = view.value
    switch (openedView) {
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
    view.value = openedView
    open.value = true
  }
  function closeCurrentView() {
    open.value = false
    view.value = null
  }
  return {
    view,
    openView,
    closeCurrentView,
    open,
    viewComponent
  }
})
