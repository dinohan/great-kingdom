import { Board, BoardWithoutHouse } from "../models/Board";
import Coordinate, { Row, Column, isValidCoordinate } from "../models/Coordinate";
import { Entity, EntityAlias } from "../models/Entity";

const {
  _,
  N,
} = EntityAlias

export const DefaultBoard = [
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, N, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
  [_, _, _, _, _, _, _, _, _],
] as Board;

const Rows: Row[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
const Columns: Column[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function getNumberFromCoordinate(coordinate: Coordinate): [number, number] {
  const [row, column] = coordinate.split('') as [Row, Column];
  const x = parseInt(column, 10) - 1;

  return [Rows.indexOf(row), x];
}

type Sides = {
  boardTop: boolean,
  boardBottom: boolean,
  boardLeft: boolean,
  boardRight: boolean,
  neutralTop: boolean,
  neutralBottom: boolean,
  neutralLeft: boolean,
  neutralRight: boolean,
}

export function meetMoreThenFourSide(sides: Sides): boolean {
  return Object.values(sides).filter(Boolean).length >= 4;
}

export function isHouse(
  y: number,
  x: number,
  board: BoardWithoutHouse,
  entity: Entity.Black | Entity.White
): boolean {
  if (
    board[y][x] === Entity.Black ||
    board[y][x] === Entity.White ||
    board[y][x] === Entity.Neutral
  ) {
    return false
  }

  const meetedSides: Sides = {
    boardTop: false,
    boardBottom: false,
    boardLeft: false,
    boardRight: false,
    neutralTop: false,
    neutralBottom: false,
    neutralLeft: false,
    neutralRight: false,
  }

  const visited: boolean[][] = [
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false, false, false],
  ];

  const opositeEntity = entity === Entity.Black ? Entity.White : Entity.Black;

  let isHouse = true;

  function dfs(y: number, x: number) {
    if (visited[y][x]) { return }

    visited[y][x] = true;

    const top = y === 0
    const bottom = y === 8
    const left = x === 0
    const right = x === 8

    if (!top && board[y-1][x] === opositeEntity) { isHouse = false; }
    if (!bottom && board[y+1][x] === opositeEntity) { isHouse = false; }
    if (!left && board[y][x-1] === opositeEntity) { isHouse = false; }
    if (!right && board[y][x+1] === opositeEntity) { isHouse = false; }

    if (top) { meetedSides.boardTop = true }
    if (bottom) { meetedSides.boardBottom = true }
    if (left) { meetedSides.boardLeft = true }
    if (right) { meetedSides.boardRight = true }

    if (!top && board[y-1][x] === Entity.Neutral) { meetedSides.neutralTop = true }
    if (!bottom && board[y+1][x] === Entity.Neutral) { meetedSides.neutralBottom = true }
    if (!left && board[y][x-1] === Entity.Neutral) { meetedSides.neutralLeft = true }
    if (!right && board[y][x+1] === Entity.Neutral) { meetedSides.neutralRight = true }

    if (meetMoreThenFourSide(meetedSides)) {
      isHouse = false;
    }

    if(!top && board[y-1][x] === null) { dfs(y-1, x)}
    if(!bottom && board[y+1][x] === null) { dfs(y+1, x)}
    if(!left && board[y][x-1] === null) { dfs(y, x-1)}
    if(!right && board[y][x+1] === null) { dfs(y, x+1)}

    return;
  }

  dfs(y, x);

  return isHouse
}

export function getBoardFromLog(log: Coordinate[]): Board {
  const board = DefaultBoard.map(row => [...row]);

  log.forEach((coordinate, index) => {
    const [y, x] = getNumberFromCoordinate(coordinate);

    board[y][x] = index % 2 === 0 ? Entity.Black : Entity.White;
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
