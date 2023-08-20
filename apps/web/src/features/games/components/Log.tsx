import React, { useEffect } from 'react'

import { Land } from 'models'

import styles from './Log.module.scss'

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

  return (
    <div
      ref={ref}
      className={styles.wrapper}
    >
      <ol>
        {log.map((land, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 && (
              <label className={styles.index}> {index / 2 + 1}</label>
            )}

            <li>{land}</li>
          </React.Fragment>
        ))}
      </ol>
    </div>
  )
}

export default Log
