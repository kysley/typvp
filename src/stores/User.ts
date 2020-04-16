import {observable, action, flow} from 'mobx'

import {client} from '@/services/Client'
import {ME} from '@/graphql/queries/me'
import {Account} from '@/generated/graphql'

// @todo create an Account type from the generated output
class UserStore {
  @observable
  me?: Partial<Account> = undefined

  @observable
  fetchingUser: boolean = false

  @action
  login = (token: string, account: Partial<Account>): void => {
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
