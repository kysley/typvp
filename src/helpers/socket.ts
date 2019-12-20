import io from 'socket.io-client'

const socketUrl =
  process.env.NODE_ENV === 'production'
    ? 'https://api.typvp.xyz'
    : 'http://localhost:8086'

export const socket = io(socketUrl)
