import {observable, action, flow} from 'mobx'

import {client} from '@/services/Client'
import {ME} from '@/graphql/queries'

type Account = {
  username: string
  id: number
  role: string
  lastSeen: number
  lastPlayed: string
  results: any
  createdAt: Date
  testCount: number
  confirmed: boolean
  color?: string
}

class UserStore {
  @observable
  me: Account | undefined = undefined

  @observable
  fetchingUser: boolean = false

  @action
  login = (token: string, account: Account): void => {
    this.me = account
    localStorage.setItem('token', token)
  }

  persist = flow(function*(
    this: UserStore,
  ): Generator<Promise<any>, void, any> {
    try {
      this.fetchingUser = true
      const {
        data: {me},
      } = yield client.query(ME).toPromise()
      if (me) this.me = me
    } catch (e) {
      console.log(e)
    } finally {
      this.fetchingUser = false
    }
  })

  @action
  logout = () => {
    localStorage.removeItem('token')
    this.me = undefined
  }
}

export default new UserStore()
