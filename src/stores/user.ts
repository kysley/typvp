import {observable, action, flow, computed} from 'mobx'

class UserStore {
  @observable
  name: string = 'User'
}

export default new UserStore()
