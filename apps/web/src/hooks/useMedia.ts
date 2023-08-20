import { useEffect, useState } from 'react'

import variables from '@/styles/variables.module.scss'

const { breakpointTablet, breakpointDesktop } = variables

function matchMedia(query: string) {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

export function useMedia() {
  const [type, setType] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (matchMedia(`(min-width: ${breakpointDesktop})`)) return 'desktop'
    if (matchMedia(`(min-width: ${breakpointTablet})`)) return 'tablet'
    return 'mobile'
  })

  useEffect(() => {
    const listener = () => {
      if (matchMedia(`(min-width: ${breakpointDesktop})`))
        return setType('desktop')
      if (matchMedia(`(min-width: ${breakpointTablet})`))
        return setType('tablet')
      return setType('mobile')
    }

    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [])

  return type
}
