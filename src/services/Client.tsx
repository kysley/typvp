import React from 'react'
import {Provider, createClient} from 'urql'

export const client = createClient({
  url: 'https://api.typvp.xyz',
  fetchOptions: () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return {
        credentials: 'include',
        headers: {
          authorization: '',
          origin: 'https://typvp.xyz',
        },
      }
    }
    return {
      credentials: 'include',
      headers: {
        authorization: `Bearer ${token}`,
        origin: 'https://typvp.xyz',
      },
    }
  },
})

export const ClientProvider = ({children}: any) => (
  <Provider value={client}>{children}</Provider>
)
