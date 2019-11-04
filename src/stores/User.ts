import {observable, action, flow} from 'mobx'

import {client} from '@/services/Client'
import ME from '@/graphql/queries/me'

interface IMe {
  username: string
  id: number
  email: string
  role: string
  lastSeen: number
  lastPlayed: string
  results: any
}

class UserStore {
  @observable
  me: IMe | undefined = undefined

  @action
  login = (token: string, account: IMe): void => {
    this.me = account
    localStorage.setItem('token', token)
  }

  persist = flow(function*(
    this: UserStore,
  ): Generator<Promise<any>, void, any> {
    const {
      data: {me},
    } = yield client.query(ME).toPromise()
    this.me = me
  })

  @action
  logout = () => {
    localStorage.removeItem('token')
    this.me = undefined
  }
}

export default new UserStore()
