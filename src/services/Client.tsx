import React from 'react'
import {Provider, createClient} from 'urql'

export const client = createClient({
  url: 'http://localhost:8081/',
  fetchOptions: () => {
    const token = localStorage.getItem('token')
    if (!token) {
      return {}
    }
    return {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  },
})

export const ClientProvider = ({children}: any) => (
  <Provider value={client}>{children}</Provider>
)
