import {observable, action} from 'mobx'

import {light, dark} from '@/styled/Theme'

class GlobalStore {
  @observable
  theme: any = light

  @observable
  mode: string = 'light'

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
