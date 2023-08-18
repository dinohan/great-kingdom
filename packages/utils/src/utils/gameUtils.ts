import {
  Board,
  BoardWithoutHouse,
  Column,
  Columns,
  Coordinate,
  House,
  InitialBoard,
  Piece,
  Row,
  Rows,
  isHouse,
  isCoordinate,
  Land,
  isLand,
  isPass,
  isPiece,
} from 'models'

export function getNumberFromCoordinate(
  coordinate: Coordinate
): [number, number] {
  const [column, row] = coordinate.split('') as [Column, Row]

  return [Rows.indexOf(row), Columns.indexOf(column)]
}

export function getCoordinateFromNumber(y: number, x: number): Coordinate {
  return `${Columns[x]}${Rows[y]}` as Coordinate
}

export function copyBoard<E>(board: Board<E>): Board<E> {
  return board.map((row) => [...row])
}

export function generateBoard<I>(item: I): Board<I> {
  return InitialBoard.map((row) => row.map(() => item))
}

type Borders = {
  boardTop: boolean
  boardBottom: boolean
  boardLeft: boolean
  boardRight: boolean
  neutralTop: boolean
  neutralBottom: boolean
  neutralLeft: boolean
  neutralRight: boolean
  [Piece.White]: boolean
  [Piece.Black]: boolean
}

export function meetMoreThenFourSide(borders: Borders): boolean {
  let count = 0

  borders.boardTop && count++
  borders.boardBottom && count++
  borders.boardLeft && count++
  borders.boardRight && count++
  borders.neutralTop && count++
  borders.neutralBottom && count++
  borders.neutralLeft && count++
  borders.neutralRight && count++

  return count >= 4
}

export function meetBothEntity(borders: Borders): boolean {
  return borders[Piece.White] && borders[Piece.Black]
}

export function searchBoardFrom(
  y: number,
  x: number,
  board: BoardWithoutHouse
): [null | Piece | House, Board<boolean>] {
  if (y < 0 || y > 8 || x < 0 || x > 8) {
    throw new Error('Invalid coordinate')
  }

  const visited = generateBoard(false)

  if (board[y][x] === Piece.Black) {
    return [Piece.Black, visited]
  }
  if (board[y][x] === Piece.White) {
    return [Piece.White, visited]
  }
  if (board[y][x] === Piece.Neutral) {
    return [Piece.Neutral, visited]
  }

  const borders: Borders = {
    boardTop: false,
    boardBottom: false,
    boardLeft: false,
    boardRight: false,
    neutralTop: false,
    neutralBottom: false,
    neutralLeft: false,
    neutralRight: false,
    [Piece.White]: false,
    [Piece.Black]: false,
  }

  function dfs(y: number, x: number) {
    if (visited[y][x]) {
      return
    }

    visited[y][x] = true

    const top = y === 0
    const bottom = y === 8
    const left = x === 0
    const right = x === 8

    if (top) {
      borders.boardTop = true
    } else {
      if (board[y - 1][x] === Piece.White) {
        borders[Piece.White] = true
      }
      if (board[y - 1][x] === Piece.Black) {
        borders[Piece.Black] = true
      }
      if (board[y - 1][x] === Piece.Neutral) {
        borders.neutralTop = true
      }
      if (board[y - 1][x] === null) {
        dfs(y - 1, x)
      }
    }
    if (bottom) {
      borders.boardBottom = true
    } else {
      if (board[y + 1][x] === Piece.White) {
        borders[Piece.White] = true
      }
      if (board[y + 1][x] === Piece.Black) {
        borders[Piece.Black] = true
      }
      if (board[y + 1][x] === Piece.Neutral) {
        borders.neutralBottom = true
      }
      if (board[y + 1][x] === null) {
        dfs(y + 1, x)
      }
    }
    if (left) {
      borders.boardLeft = true
    } else {
      if (board[y][x - 1] === Piece.White) {
        borders[Piece.White] = true
      }
      if (board[y][x - 1] === Piece.Black) {
        borders[Piece.Black] = true
      }
      if (board[y][x - 1] === Piece.Neutral) {
        borders.neutralLeft = true
      }
      if (board[y][x - 1] === null) {
        dfs(y, x - 1)
      }
    }
    if (right) {
      borders.boardRight = true
    } else {
      if (board[y][x + 1] === Piece.White) {
        borders[Piece.White] = true
      }
      if (board[y][x + 1] === Piece.Black) {
        borders[Piece.Black] = true
      }
      if (board[y][x + 1] === Piece.Neutral) {
        borders.neutralRight = true
      }
      if (board[y][x + 1] === null) {
        dfs(y, x + 1)
      }
    }

    return
  }

  dfs(y, x)

  if (meetBothEntity(borders)) {
    return [null, visited]
  }
  if (meetMoreThenFourSide(borders)) {
    return [null, visited]
  }

  if (borders[Piece.White]) {
    return [House.White, visited]
  }
  if (borders[Piece.Black]) {
    return [House.Black, visited]
  }

  return [null, visited]
}

export function buildHouseFromBoard(board: BoardWithoutHouse): Board {
  const result = copyBoard<Piece | House | null>(board)
  let visited = generateBoard(false)

  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (visited[y][x]) {
        return
      }
      if (cell === null) {
        const [entity, $visited] = searchBoardFrom(y, x, board)
        visited = visited.map((row, y) =>
          row.map((cell, x) => cell || $visited[y][x])
        )

        if (isHouse(entity)) {
          $visited.forEach((row, y) => {
            row.forEach((cell, x) => {
              if (cell) {
                result[y][x] = entity
              }
            })
          })
        }
      }
    })
  })

  return result
}

export function build(board: BoardWithoutHouse): Board {
  return buildHouseFromBoard(board)
}

export function getBoardFromLog(log: Land[]): BoardWithoutHouse {
  const board = copyBoard<Piece | null>(InitialBoard)

  log.forEach((land, index) => {
    if (!isCoordinate(land)) {
      return
    }

    const [y, x] = getNumberFromCoordinate(land)

    board[y][x] = index % 2 === 0 ? Piece.Black : Piece.White
  })

  return board
}

export function isDead(y: number, x: number, board: Board): boolean {
  const piece = board[y][x]

  if (!isPiece(piece)) {
    return false
  }

  const house = piece === Piece.Black ? House.Black : House.White

  let bordersOnNull = false
  let bordersOnHouse = false

  const visited = generateBoard(false)

  const dfs = (y: number, x: number) => {
    if (visited[y][x]) {
      return
    }

    visited[y][x] = true

    const top = y === 0
    const bottom = y === 8
    const left = x === 0
    const right = x === 8

    !top && board[y - 1][x] === null && (bordersOnNull = true)
    !bottom && board[y + 1][x] === null && (bordersOnNull = true)
    !left && board[y][x - 1] === null && (bordersOnNull = true)
    !right && board[y][x + 1] === null && (bordersOnNull = true)

    !top && board[y - 1][x] === house && (bordersOnHouse = true)
    !bottom && board[y + 1][x] === house && (bordersOnHouse = true)
    !left && board[y][x - 1] === house && (bordersOnHouse = true)
    !right && board[y][x + 1] === house && (bordersOnHouse = true)

    if (bordersOnNull || bordersOnHouse) {
      return
    }

    if (!top && board[y - 1][x] === piece) {
      dfs(y - 1, x)
    }
    if (!bottom && board[y + 1][x] === piece) {
      dfs(y + 1, x)
    }
    if (!left && board[y][x - 1] === piece) {
      dfs(y, x - 1)
    }
    if (!right && board[y][x + 1] === piece) {
      dfs(y, x + 1)
    }
  }

  dfs(y, x)

  return !bordersOnNull && !bordersOnHouse
}

export function isGameEnded(log: Land[]): boolean {
  if (log.length >= 81) {
    return true
  }

  for (let i = log.length - 1; i >= 1; i--) {
    if (isPass(log[i]) && isPass(log[i - 1])) {
      return true
    }
  }

  const board = build(getBoardFromLog(log))

  const isEveryCellFilled = board.every((row) =>
    row.every((cell) => cell !== null)
  )

  if (isEveryCellFilled) {
    return true
  }

  return false
}

export function isValidLog(log: unknown): log is Land[] {
  if (!Array.isArray(log)) {
    return false
  }
  if (log.length > 81) {
    return false
  }
  if (!log.every(isLand)) {
    return false
  }

  return true
}
