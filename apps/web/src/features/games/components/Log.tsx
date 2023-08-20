import React from 'react'

import { Land } from 'models'

import styles from './Log.module.scss'

function Log({ log }: { log: Land[] }) {
  return (
    <div className={styles.wrapper}>
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
