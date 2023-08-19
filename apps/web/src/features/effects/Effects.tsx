import { useEffect } from 'react'

import { useRefresh } from '@/features/auth'

import socket from './socket'

function Effects() {
  useRefresh()

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

  return <></>
}

export default Effects
