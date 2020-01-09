import React from 'react'
import {Provider, createClient} from 'urql'

const clientUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.typvp.xyz/graphql'
    : 'http://localhost:8081/graphql'

export const client = createClient({
  url: clientUrl,
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
