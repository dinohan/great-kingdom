import React, { useEffect } from 'react'

import { Land } from 'models'

import styles from './Log.module.scss'
import LogContent from './LogContent'

function Log({ log }: { log: Land[] }) {
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(function initializeScrollBottom() {
    const target = ref.current

    if (!target) {
      return
    }

    const resizeObserver = new ResizeObserver(function scrollToBottom() {
      target.scrollTop = target.scrollHeight
    })

    resizeObserver.observe(ref.current)

    return function cleanup() {
      resizeObserver.disconnect()
    }
  }, [])

  const Header = (
    <>
      <label className={styles.index} />
      <li>🟦</li>
      <li>🟧</li>
    </>
  )

  return (
    <div
      ref={ref}
      className={styles.wrapper}
    >
      <ol>
        {Header}

        <LogContent log={log} />
      </ol>
    </div>
  )
}

export default Log
