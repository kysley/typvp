import React from 'react'

import UserStore from '@/stores/User'
import GameStore from '@/stores/Game'

const RootStore = {
  UserStore,
  GameStore,
}

type TUser = typeof UserStore
type TGame = typeof GameStore

interface IRootStore {
  UserStore: TUser
  GameStore: TGame
}

const StoreContext = React.createContext<IRootStore | null>(null)

export const StoreProvider = ({children}: any) => {
  const store = RootStore
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}

export const useStore = () => {
  const store = React.useContext(StoreContext)

  if (!store) {
    throw new Error('You have forgot to use StoreProvider.. oops')
  }
  return store
}
