import { mount, VueWrapper } from '@vue/test-utils'
import { describe, afterEach, beforeEach, it, expect, vi } from 'vitest'
import { ref, Teleport } from 'vue'
import { LoginPopUp, Dialog } from '@/components'
import { useAuth } from '@/stores'
const logInMock = vi.fn().mockResolvedValueOnce(null) // Mock the login function
vi.mock('@/stores', () => ({
  useAuth: vi.fn(() => ({
    login: logInMock
  }))
}))

describe('Testing LoginPopUp Component ', () => {

  // let wrapper: VueWrapper
  // beforeEach(async () => {
  //   wrapper = await mount(LoginPopUp)
  // })
  // afterEach(async () => {
  //   // document.body.removeChild(teleportTarget);
  //   await wrapper?.unmount()
  // })
  console.log('start')
  const wrapper = mount(LoginPopUp)
  console.log('content', wrapper.html(), '--------------end here ----------')
  it('renders correctly', async () => {
    // expect(wrapper.findComponent(LoginPopUp).exists()).toBe(true)

    // expect(wrapper.find('input[name="email"]').exists()).toBe(true)

    // expect(wrapper.find('input[name="password"]').exists()).toBe(true)

    // expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
  })

  // it('toggles password visibility', async () => {

  //   // Initially, the password field should be of type 'password'
  //   let passwordInput = wrapper.find('input[type="password"]')
  //   expect(passwordInput.exists()).toBe(true)

  //   // Click the toggle button to show password
  //   await wrapper.findComponent({ name: 'Eye' }).trigger('click')

  //   // Now, the password field should be of type 'text'
  //   passwordInput = wrapper.find('input[type="text"]')
  //   expect(passwordInput.exists()).toBe(true)
  // })

  // it('displays login error message on failed login', async () => {
  //   // const loginMock = useAuth().login
  //   // loginMock.mockRejectedValueOnce(new Error('Invalid credentials'))


  //   // Fill in the form
  //   await wrapper.find('input[type="email"]').setValue('wrong-email@example.com')
  //   await wrapper.find('input[type="password"]').setValue('wrongpassword')

  //   // Submit the form
  //   await wrapper.find('form').trigger('submit.prevent')

  //   // Wait for the login process to complete
  //   await wrapper.vm.$nextTick()

  //   // Expect the login error message to appear
  //   expect(wrapper.find('.text-destructive').text()).toContain('Invalid credentials')
  // })

  // it('submits form successfully when correct credentials are provided', async () => {
  //   const loginMock = useAuth().login


  //   // Fill in the form with valid credentials
  //   await wrapper.find('input[type="email"]').setValue('user@gmail.com')
  //   await wrapper.find('input[type="password"]').setValue('123123123')

  //   // Submit the form
  //   await wrapper.find('form').trigger('submit.prevent')

  //   // Ensure login function is called with correct credentials
  //   expect(loginMock).toHaveBeenCalledWith({
  //     email: 'user@gmail.com',
  //     password: '123123123'
  //   })
  // })
})
