import { useMe, useRefresh } from '@/features/auth'

import useSocket from './useSocket'

function Effects() {
  useRefresh()
  useMe()
  useSocket()

  return <></>
}

export default Effects
