import { useEffect } from 'react'

import socket from './socket'

export default function useSocket() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('disconnect', () => {
      console.log('disconnected')
    })

    return () => {
      socket.off('connect')
    }
  }, [])
}
