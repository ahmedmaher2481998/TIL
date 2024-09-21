import { mount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPopUp, LoginWithGoogleComponent } from '..'
import { Eye, EyeOff } from 'lucide-vue-next';
import { wrap } from "module";
// tests 
/**
 * does it  render all needed elements (done)
 * does it toggle password field
 * does it show errors when invalid inputs 
 * does it call login with password from useAuth 
 * does it show loginWithGoogle Button 
 */
const logInMock = vi.fn().mockResolvedValueOnce(null)
vi.mock('@/stores', () => ({
  useAuth: () => ({
    login: logInMock
  })
}))

describe('testing login pop up component', () => {

  let wrapper: VueWrapper
  beforeEach(() => {
    wrapper = mount(LoginPopUp)

  })


  it('renders correctly with all needed elements', () => {

    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)

    const email = wrapper.find('input[name="email"]')
    expect(email.exists()).toBe(true)
    expect(email.attributes('placeholder')).toBe('user@email.com')

    const password = wrapper.find('input[name="password"]')
    expect(password.exists()).toBe(true)

    const loginButton = wrapper.find('button[type="submit"]')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.text().toLocaleLowerCase()).toBe('login')

  })


  it('it toggle password visibility', async () => {
    // initial state is type = password  
    const password = wrapper.find('input[name="password"]')
    expect(password.attributes('type')).toBe('password')
    // check for the show password icon 
    const showPassword = wrapper.findComponent(Eye)
    expect(showPassword.exists()).toBe(true)
    // check for the hide password icon not rendered yet  
    expect(wrapper.findComponent(EyeOff).exists()).toBe(false)
    // show password
    await showPassword.trigger('click')
    expect(password.attributes('type')).toBe('text')
    expect(wrapper.findComponent(Eye).exists()).toBe(false)

    const hidePassword = wrapper.findComponent(EyeOff)
    expect(hidePassword.exists()).toBe(true)
    // hide password 
    await showPassword.trigger('click')
    expect(password.attributes('type')).toBe('password')
    expect(wrapper.findComponent(Eye).exists()).toBe(true)


  })
})