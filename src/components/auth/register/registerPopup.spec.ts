import { flushPromises, mount, VueWrapper, } from "@vue/test-utils";
import waitForExpect from 'wait-for-expect';
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { RegisterPopUp } from '..'
import { Eye, EyeOff } from 'lucide-vue-next';
import { FormMessage } from "@/components/ui";
import { createPinia, setActivePinia } from "pinia";
/** tests cases outline  
 * does it  render all needed elements
 *    -  avatar, name , email, password, conform password (done)
 * does it toggle password & confirm password field (-done)
 * does it show errors when invalid inputs,validate all inputs  (-done)
 * does it call register with correct data from useAuth  (-done)
 * display error when register fails (-done)
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
    wrapper = mount(RegisterPopUp)
    setActivePinia(createPinia())


  })

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    vi.clearAllMocks()
  })

  it.skip('renders correctly', () => {
    expect(wrapper.exists()).toBe(true);
  })
  it.skip('renders correctly with all needed elements', () => {

    const form = wrapper.find('form')
    expect(form.exists()).toBe(true)

    const name = wrapper.find('[name="name"]')
    expect(name.exists()).toBe(true)
    expect(name.attributes('placeholder')).toBeTruthy()

    const avatar = wrapper.find('input[type="file"]')
    expect(avatar.exists()).toBe(true)

    const email = wrapper.find('input[type="email"]')
    expect(email.exists()).toBe(true)
    expect(email.attributes('placeholder')).toBeTruthy()

    const password = wrapper.find('input[name="confirmPassword"]')
    expect(password.exists()).toBe(true)

    const confirmPassword = wrapper.find('input[name="password"]')
    expect(confirmPassword.exists()).toBe(true)

    const loginButton = wrapper.find('button[type="submit"]')
    expect(loginButton.exists()).toBe(true)
    expect(loginButton.text().toLocaleLowerCase()).toContain('register')

  })
  /**in the process of refactoring test file  */
  it.skip('it toggle password & confirm Password visibility separately ', async () => {
    const password = wrapper.find('input[name="password"]')
    expect(password.attributes('type')).toBe('password')
    // checking toggle password 
    const showPasswordTestId = '[data-testid="password-eye-1"]'
    const hidePasswordTestId = '[data-testid="password-eye-off-1"]'
    expect(wrapper.find(showPasswordTestId).exists()).toBe(true)
    expect(wrapper.find(hidePasswordTestId).exists()).toBe(false)
    await wrapper.find(showPasswordTestId).trigger('click')
    expect(password.attributes('type')).toBe('text')
    expect(wrapper.find(hidePasswordTestId).exists()).toBe(true)
    expect(wrapper.find(showPasswordTestId).exists()).toBe(false)
    await wrapper.find(hidePasswordTestId).trigger('click')
    expect(password.attributes('type')).toBe('password')
    /** Confirm Password */
    const confirmPassword = wrapper.find('input[name="confirmPassword"]')
    expect(confirmPassword.attributes('type')).toBe('password')
    // checking toggle confirm password 
    const showConfirmPasswordTestId = '[data-testid="password-eye-2"]'
    const hideConfirmPasswordTestId = '[data-testid="password-eye-off-2"]'
    expect(wrapper.find(showConfirmPasswordTestId).exists()).toBe(true)
    expect(wrapper.find(hideConfirmPasswordTestId).exists()).toBe(false)
    await wrapper.find(showConfirmPasswordTestId).trigger('click')
    expect(confirmPassword.attributes('type')).toBe('text')
    expect(wrapper.find(hideConfirmPasswordTestId).exists()).toBe(true)
    expect(wrapper.find(showConfirmPasswordTestId).exists()).toBe(false)
    await wrapper.find(hideConfirmPasswordTestId).trigger('click')
    expect(confirmPassword.attributes('type')).toBe('password')


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
  it.skip('calls login functionality from useAuth Store ', async () => {
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

  it.skip('displays an error message when login fails', async () => {
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



  it.skip('matches the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
})