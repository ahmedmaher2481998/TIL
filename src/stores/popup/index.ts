import { type ViewType } from '@/types'
// import type { QueryData } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { LoginPopUp, LogoutPopUp, RegisterPopUp, UpdateUserProfilePopUp } from '@/components'
export const usePopUp = defineStore('popUp', () => {
  const view = ref<ViewType | null>(null)
  const open = ref<boolean>(false)
  const popUpTitle = ref<string>('default Title')
  const popUpDescription = ref<string>('default Description')
  const viewComponent = computed(() => {
    const openedView = view.value
    switch (openedView) {
      case 'login':
        popUpTitle.value = 'login to your account'
        popUpDescription.value = 'to view your personalized content , experience ,explore and write your fav content.'
        return LoginPopUp
      case 'register ':
        popUpTitle.value = 'register new account'
        popUpDescription.value = 'to create your own personalized content , experience , explore and write your fav content.'
        return RegisterPopUp
      case 'addNewTag':
        return null
      case 'logout':
        popUpTitle.value = 'Are you sure you wanna log out ?'
        popUpDescription.value = `by logout you won't be able to write new blogs,but you will still be able to view & filter content.`
        return LogoutPopUp

      case 'updateUserProfile':
        popUpTitle.value = 'Update your profile'
        popUpDescription.value = 'to update your profile picture, name, or password.'
        return UpdateUserProfilePopUp
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
    popUpTitle,
    popUpDescription,
    viewComponent
  }
})
