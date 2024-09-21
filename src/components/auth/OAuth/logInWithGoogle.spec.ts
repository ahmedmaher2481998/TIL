import { flushPromises, mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { Button, LoginWithGoogleComponent } from '@/components'
import { useAuth } from '@/stores'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const loginWithGoogleMock = vi.fn(async () => {
  return Promise.resolve('logged in')
})
describe('MyComponent', () => {
  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(LoginWithGoogleComponent)
    vi.mock('@/stores', () => ({
      useAuth: vi.fn(() => ({
        loginWithGoogle: loginWithGoogleMock,
      })),
    }))
    setActivePinia(createPinia())
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  })


  it('renders the button with correct text and icon', () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('Login with Google')
    // testing that the logo is rendered correctly
    const icon = wrapper.find<HTMLImageElement>('img[alt="google logo"]')
    expect(icon.exists()).toBe(true);
    expect(icon.attributes('src')).toBe('https://www.svgrepo.com/show/475656/google-color.svg')


  })

  it('calls auth.loginWithGoogle when the button is clicked', async () => {
    const button = wrapper.findComponent(Button)
    await button.trigger('click')
    await flushPromises()
    expect(loginWithGoogleMock).toHaveBeenCalled() //Fails 
  })

  it('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
})