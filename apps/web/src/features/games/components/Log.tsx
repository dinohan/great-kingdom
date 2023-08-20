import React, { useEffect, useMemo } from 'react'

import classNames from 'classnames'
import { Land } from 'models'

import { useMedia } from '@/hooks/useMedia'

import styles from './Log.module.scss'

function reverseAndSwapPairs<T>(arr: T[]): T[] {
  const reversed = [...arr].reverse() // 먼저 배열을 뒤집습니다.

  for (let i = 0; i < reversed.length; i += 2) {
    if (i + 1 < reversed.length) {
      const tmp = reversed[i]
      reversed[i] = reversed[i + 1]
      reversed[i + 1] = tmp
    }
  }

  return reversed
}

function Log({ log }: { log: Land[] }) {
  const ref = React.useRef<HTMLDivElement>(null)

  const media = useMedia()

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

  const lastLand = log.at(-1)

  const Header = (
    <>
      <label className={styles.index} />
      <li>🟦</li>
      <li>🟧</li>
    </>
  )

  const Contents = useMemo(() => {
    if (media === 'mobile') {
      const reversed = reverseAndSwapPairs(log)

      return (
        <>
          {log.length % 2 !== 0 && <li />}
          {reversed.map((land, index) => (
            <React.Fragment key={index}>
              {index % 2 === 0 && (
                <label className={styles.index}>
                  {' '}
                  {reversed.length / 2 - (index / 2 + 1) + 1}
                </label>
              )}

              <li
                className={classNames({
                  [styles.black]: land === lastLand && log.length % 2 !== 0,
                  [styles.white]: land === lastLand && log.length % 2 === 0,
                })}
              >
                {land}
              </li>
            </React.Fragment>
          ))}
        </>
      )
    }

    return (
      <>
        {log.map((land, index) => (
          <React.Fragment key={index}>
            {index % 2 === 0 && (
              <label className={styles.index}> {index / 2 + 1}</label>
            )}

            <li
              className={classNames({
                [styles.black]: land === lastLand && log.length % 2 !== 0,
                [styles.white]: land === lastLand && log.length % 2 === 0,
              })}
            >
              {land}
            </li>
          </React.Fragment>
        ))}

        {log.length % 2 !== 0 && <li />}
      </>
    )
  }, [lastLand, log, media])

  return (
    <div
      ref={ref}
      className={styles.wrapper}
    >
      <ol>
        {Header}
        {Contents}
      </ol>
    </div>
  )
}

export default Log
