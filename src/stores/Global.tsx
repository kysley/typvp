import {observable, action} from 'mobx'

import {light, dark} from '@/styled/Theme'

function setColorScheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
  const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
  const isNotSpecified = window.matchMedia(
    '(prefers-color-scheme: no-preference)',
  ).matches
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addListener(e => e.matches && handleDefaultMode(true))
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addListener(e => e.matches && handleDefaultMode(false))

  if (isDarkMode) handleDefaultMode(true)
  if (isLightMode) handleDefaultMode(false)
  if (isNotSpecified || hasNoSupport) {
    console.log(
      'You specified no preference for a color scheme or your browser does not support it. I schedule dark mode during night time.',
    )
    // const now = new Date()
    // const hour = now.getHours()
    // if (hour < 4 || hour >= 16) {
    //   handleDefaultMode()
    // }
  }
}

function handleDefaultMode(isDark: boolean): string {
  const savedMode = localStorage.getItem('mode')
  const performedDefaultThemeAdjust = localStorage.getItem('pdta')
  if (performedDefaultThemeAdjust === 'true') return savedMode || 'light'

  if (isDark) {
    localStorage.setItem('mode', 'dark')
  } else {
    localStorage.setItem('mode', 'light')
  }

  localStorage.setItem('pdta', 'true')

  return localStorage.getItem('mode') as string
}

setColorScheme()

class GlobalStore {
  @observable
  mode: string = localStorage.getItem('mode') as string

  @observable
  theme: any = this.mode === 'light' ? light : dark

  @action
  toggleTheme = () => {
    if (this.mode === 'light') {
      this.mode = 'dark'
      this.theme = dark
      localStorage.setItem('mode', 'dark')
      return
    }
    this.mode = 'light'
    this.theme = light
    localStorage.setItem('mode', 'light')
  }
}

export default new GlobalStore()
