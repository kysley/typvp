import {observable, action} from 'mobx'

import {light, dark} from '@/styled/Theme'

class GlobalStore {
  @observable
  mode: string = localStorage.getItem('mode') || 'light'

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
