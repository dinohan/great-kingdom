import React from 'react'

import classNames from 'classnames'
import { Land } from 'models'

import { useMedia } from '@/hooks/useMedia'

import styles from './Log.module.scss'

function reverseAndSwapPairs(arr: Land[]): (Land | null)[] {
  const reversed = [...arr].reverse() as (Land | null)[]

  if (reversed.length % 2 !== 0) {
    reversed.unshift(null)
  }

  for (let i = 0; i < reversed.length; i += 2) {
    if (i + 1 < reversed.length) {
      const tmp = reversed[i]
      reversed[i] = reversed[i + 1]
      reversed[i + 1] = tmp
    }
  }

  return reversed
}

function LogContent({ log }: { log: Land[] }) {
  const media = useMedia()
  const lastLand = log.at(-1)

  if (media === 'mobile') {
    const reversed = reverseAndSwapPairs(log)

    return reversed.map((land, index) => (
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
    ))
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
}

export default LogContent
