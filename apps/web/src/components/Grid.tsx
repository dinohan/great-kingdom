import { Board } from 'models'
import Space from './Space'
import styles from './Grid.module.scss'

function Grid({ board }: { board: Board }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {board.map((row, i) =>
          row.map((entity, j) => (
            <Space
              key={`${i}-${j}`}
              x={j}
              y={i}
              entity={entity}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default Grid
