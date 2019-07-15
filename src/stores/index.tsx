import React from 'react'

import UserStore from '@/stores/User'
import GameStore from '@/stores/Game'

const RootStore = {
  UserStore,
  GameStore,
}

const StoreContext = React.createContext<any>(null)

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
