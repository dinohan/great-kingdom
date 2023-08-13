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
  isValidCoordinate,
} from "models";


function getNumberFromCoordinate(coordinate: Coordinate): [number, number] {
  const [column, row] = coordinate.split('') as [Column, Row];

  return [
    Rows.indexOf(row),
    Columns.indexOf(column)
  ];
}

export function getCoordinateFromNumber(y: number, x: number): Coordinate {
  return `${Columns[x]}${Rows[y]}` as Coordinate;
}

export function copyBoard<E>(board: Board<E>): Board<E> {
  return board.map(row => [...row]);
}

export function generateBoard<I>(item: I): Board<I> {
  return InitialBoard.map(row => row.map(() => item));
}

type Meeted = {
  boardTop: boolean,
  boardBottom: boolean,
  boardLeft: boolean,
  boardRight: boolean,
  neutralTop: boolean,
  neutralBottom: boolean,
  neutralLeft: boolean,
  neutralRight: boolean,
  [Piece.White]: boolean,
  [Piece.Black]: boolean,
}

export function meetMoreThenFourSide(meeted: Meeted): boolean {
  let count = 0;

  meeted.boardTop && count++;
  meeted.boardBottom && count++;
  meeted.boardLeft && count++;
  meeted.boardRight && count++;
  meeted.neutralTop && count++;
  meeted.neutralBottom && count++;
  meeted.neutralLeft && count++;
  meeted.neutralRight && count++;

  return count >= 4;
}

export function meetBothEntity(meeted: Meeted): boolean {
  return meeted[Piece.White] && meeted[Piece.Black];
}

export function searchBoardFrom(
  y: number,
  x: number,
  board: BoardWithoutHouse,
): [null | Piece | House, Board<boolean>] {
  if (
    y < 0 ||
    y > 8 ||
    x < 0 ||
    x > 8
  ) {
    throw new Error('Invalid coordinate');
  }

  const visited = generateBoard(false)

  if (board[y][x] === Piece.Black) { return [Piece.Black, visited] }
  if (board[y][x] === Piece.White) { return [Piece.White, visited] }
  if (board[y][x] === Piece.Neutral) { return [Piece.Neutral, visited] }

  const meeted: Meeted = {
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
    if (visited[y][x]) { return }

    visited[y][x] = true;

    const top = y === 0
    const bottom = y === 8
    const left = x === 0
    const right = x === 8

    if (top) {
      meeted.boardTop = true
    } else {
      if (board[y-1][x] === Piece.White) { meeted[Piece.White] = true }
      if (board[y-1][x] === Piece.Black) { meeted[Piece.Black] = true }
      if (board[y-1][x] === Piece.Neutral) { meeted.neutralTop = true }
      if (board[y-1][x] === null) { dfs(y-1, x) }
    }
    if (bottom) {
      meeted.boardBottom = true
    } else {
      if (board[y+1][x] === Piece.White) { meeted[Piece.White] = true }
      if (board[y+1][x] === Piece.Black) { meeted[Piece.Black] = true }
      if (board[y+1][x] === Piece.Neutral) { meeted.neutralBottom = true }
      if (board[y+1][x] === null) { dfs(y+1, x) }
    }
    if (left) {
      meeted.boardLeft = true
    } else {
      if (board[y][x-1] === Piece.White) { meeted[Piece.White] = true }
      if (board[y][x-1] === Piece.Black) { meeted[Piece.Black] = true }
      if (board[y][x-1] === Piece.Neutral) { meeted.neutralLeft = true }
      if (board[y][x-1] === null) { dfs(y, x-1) }
    }
    if (right) {
      meeted.boardRight = true
    } else {
      if (board[y][x+1] === Piece.White) { meeted[Piece.White] = true }
      if (board[y][x+1] === Piece.Black) { meeted[Piece.Black] = true }
      if (board[y][x+1] === Piece.Neutral) { meeted.neutralRight = true }
      if (board[y][x+1] === null) { dfs(y, x+1) }
    }

    return;
  }

  dfs(y, x);

  if (meetBothEntity(meeted)) { return [null, visited] }
  if (meetMoreThenFourSide(meeted)) { return [null, visited] }

  if (meeted[Piece.White]) { return [House.White, visited] }
  if (meeted[Piece.Black]) { return [House.Black, visited] }

  return [null, visited]
}

export function buildHouseFromBoard(board: BoardWithoutHouse): Board {
  const result = copyBoard<Piece | House | null>(board);
  let visited = generateBoard(false);

  board.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (visited[y][x]) { return }
      if (cell === null) {
        const [entity, $visited] = searchBoardFrom(y, x, board)
        visited = visited.map((row, y) => row.map((cell, x) => cell || $visited[y][x]))

        if (isHouse(entity)) {
          $visited.forEach((row, y) => {
            row.forEach((cell, x) => {
              if (cell) { result[y][x] = entity }
            })
          })
        }
      }
    })
  })

  return result;
}

export function build(board: BoardWithoutHouse): Board {
  return buildHouseFromBoard(board);
}

export function getBoardFromLog(log: Coordinate[]): BoardWithoutHouse {
  const board = copyBoard<Piece | null>(InitialBoard);

  log.forEach((coordinate, index) => {
    const [y, x] = getNumberFromCoordinate(coordinate);

    board[y][x] = index % 2 === 0 ? Piece.Black : Piece.White;
  })

  return board;
}

export function availableSteps(map: Board): Coordinate[] {
  const steps: Coordinate[] = [];

  map.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === null) {
        steps.push(`${Rows[y]}${Columns[x]}` as Coordinate);
      }
    })
  })

  return steps;
}

export function isValidLog(log: unknown): log is Coordinate[] {
  if (!Array.isArray(log)) { return false }
  if (log.length > 81) { return false }
  if (!log.every(isValidCoordinate)) { return false }

  return true;
}
