import { flushPromises, mount, VueWrapper, } from "@vue/test-utils";
import waitForExpect from 'wait-for-expect';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LoginPopUp } from '..'
import { Eye, EyeOff } from 'lucide-vue-next';
import { Button, FormMessage } from "@/components/ui";
import { createPinia, setActivePinia } from "pinia";
/** tests cases outline  
 * does it  render all needed elements (done)
 * does it toggle password field (done)
 * does it show errors when invalid inputs (done)
 * does it call login with password from useAuth  (done)
 * display error when login fails (done)
 */
const login = vi.fn()

describe('testing login pop up component', () => {

  let wrapper: VueWrapper
  vi.mock('@/stores', () => ({
    useAuth: () => ({
      login
    }),
  }))
  beforeEach(() => {
    wrapper = mount(LoginPopUp)
    setActivePinia(createPinia())


  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    vi.clearAllMocks()
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  })
  it('renders correctly with all needed elements', () => {

    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)

    const email = wrapper.find('input[name="email"]')
    expect(email.exists()).toBe(true)
    expect(email.attributes('placeholder')).toBeTruthy()

    const password = wrapper.find('input[name="password"]')
    expect(password.exists()).toBe(true)

    const loginButton = wrapper.find('button[type="submit"]')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.text().toLocaleLowerCase()).toContain('login')

  })
  it('it toggle password visibility', async () => {
    // initial state is type = password  
    const password = wrapper.find('input[name="password"]')
    expect(password.attributes('type')).toBe('password')
    // check for the show password icon 
    const showPassword = wrapper.findComponent(Eye)
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
  it('handles form validation', async () => {
    // selecting error messages components
    const messages = wrapper.findAllComponents(FormMessage)

    const email = wrapper.find('input[name="email"]')

    const password = wrapper.find('input[name="password"]')

    const loginButton = wrapper.find('button[type="submit"]')

    expect(wrapper.findComponent(FormMessage).text()).toBeFalsy()
    // setting email to wrong value checking for error message
    await email.trigger('change')
    expect(messages.length).toBe(2)
    await waitForExpect(() => {
      expect(messages[0].text()).toBeTruthy()
    })



    // setting email to correct value checking for error message disappeared 
    await email.setValue('vaild@email.com')
    await email.trigger('change')
    await waitForExpect(() => {
      expect(messages[0].text()).toBeFalsy()
    })
    // empty password errors 
    await password.trigger('change')
    await waitForExpect(() => {
      expect(messages[1].text()).toBeTruthy()
    })
    // valid password no errors
    await password.trigger('change')
    await password.setValue('12345678')
    await waitForExpect(() => {
      expect(messages[1].text()).toBeFalsy()
    })
    // empty password & empty email errors 
    await email.setValue('')
    await password.setValue('')
    await loginButton.trigger('click')
    await waitForExpect(() => {
      expect(messages[0].text()).toBeTruthy()
      expect(messages[1].text()).toBeTruthy()
    })

  })
  it('calls login functionality from useAuth Store ', async () => {
    const email = wrapper.find('input[name="email"]')
    const password = wrapper.find('input[name="password"]')
    const form = wrapper.find('form')
    const emailTest = 'vaild@email.com',
      passwordTest = '123456789'
    email.setValue(emailTest)
    await email.trigger('change')
    password.setValue(passwordTest)
    await password.trigger('change')
    const values = {
      email: emailTest,
      password: passwordTest
    }
    await form.trigger('submit')
    await flushPromises()

    await waitForExpect(() => {
      expect(login).toBeCalled()
      expect(login).toBeCalledTimes(1)
      expect(login).toBeCalledWith(values)

    })
  })

  it('displays an error message when login fails', async () => {
    const errorMessage = 'Invalid email or password';
    login.mockRejectedValueOnce(new Error(errorMessage));
    await wrapper.find('[name="email"]').setValue('user@email.com');
    await wrapper.find('[name="password"]').setValue('wrongPassword');

    const form = wrapper.find('form');
    await form.trigger('submit.prevent');
    await wrapper.vm.$nextTick();
    await waitForExpect(() => {

      expect(login).toHaveBeenCalledWith({
        email: 'user@email.com',
        password: 'wrongPassword',
      });

      const errorDisplay = wrapper.find('[data-testid="form-error-display"]');
      expect(errorDisplay.exists()).toBe(true);
      expect(errorDisplay.text()).toBe(errorMessage);
    })
  });



})