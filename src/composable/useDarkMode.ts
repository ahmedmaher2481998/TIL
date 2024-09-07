import { useDark, useToggle } from "@vueuse/core"
export function useDarkMode() {

  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return { toggleDark: () => toggleDark(), isDark }
}
