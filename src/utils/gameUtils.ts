import { Board, BoardWithoutHouse } from "../models/Board";
import Coordinate, { Row, Column, isValidCoordinate } from "../models/Coordinate";
import { Entity, EntityAlias, House } from "../models/Entity";

const {
  _,
  N,
} = EntityAlias

export const InitialBoard = [
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

type Meeted = {
  boardTop: boolean,
  boardBottom: boolean,
  boardLeft: boolean,
  boardRight: boolean,
  neutralTop: boolean,
  neutralBottom: boolean,
  neutralLeft: boolean,
  neutralRight: boolean,
  [Entity.White]: boolean,
  [Entity.Black]: boolean,
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
  return meeted[Entity.White] && meeted[Entity.Black];
}

export function isHouse(
  y: number,
  x: number,
  board: BoardWithoutHouse,
): [null | Entity | House, Board<boolean>] {
  if (
    y < 0 ||
    y > 8 ||
    x < 0 ||
    x > 8
  ) {
    throw new Error('Invalid coordinate');
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

  if (board[y][x] === Entity.Black) { return [Entity.Black, visited] }
  if (board[y][x] === Entity.White) { return [Entity.White, visited] }
  if (board[y][x] === Entity.Neutral) { return [Entity.Neutral, visited] }

  const meeted: Meeted = {
    boardTop: false,
    boardBottom: false,
    boardLeft: false,
    boardRight: false,
    neutralTop: false,
    neutralBottom: false,
    neutralLeft: false,
    neutralRight: false,
    [Entity.White]: false,
    [Entity.Black]: false,
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
      if (board[y-1][x] === Entity.White) { meeted[Entity.White] = true }
      if (board[y-1][x] === Entity.Black) { meeted[Entity.Black] = true }
      if (board[y-1][x] === Entity.Neutral) { meeted.neutralTop = true }
      if (board[y-1][x] === null) { dfs(y-1, x) }
    }
    if (bottom) {
      meeted.boardBottom = true
    } else {
      if (board[y+1][x] === Entity.White) { meeted[Entity.White] = true }
      if (board[y+1][x] === Entity.Black) { meeted[Entity.Black] = true }
      if (board[y+1][x] === Entity.Neutral) { meeted.neutralBottom = true }
      if (board[y+1][x] === null) { dfs(y+1, x) }
    }
    if (left) {
      meeted.boardLeft = true
    } else {
      if (board[y][x-1] === Entity.White) { meeted[Entity.White] = true }
      if (board[y][x-1] === Entity.Black) { meeted[Entity.Black] = true }
      if (board[y][x-1] === Entity.Neutral) { meeted.neutralLeft = true }
      if (board[y][x-1] === null) { dfs(y, x-1) }
    }
    if (right) {
      meeted.boardRight = true
    } else {
      if (board[y][x+1] === Entity.White) { meeted[Entity.White] = true }
      if (board[y][x+1] === Entity.Black) { meeted[Entity.Black] = true }
      if (board[y][x+1] === Entity.Neutral) { meeted.neutralRight = true }
      if (board[y][x+1] === null) { dfs(y, x+1) }
    }

    return;
  }

  dfs(y, x);

  if (meetBothEntity(meeted)) { return [null, visited] }
  if (meetMoreThenFourSide(meeted)) { return [null, visited] }

  if (meeted[Entity.White]) { return [House.White, visited] }
  if (meeted[Entity.Black]) { return [House.Black, visited] }

  return [null, visited]
}

export function getBoardFromLog(log: Coordinate[]): Board {
  const board = InitialBoard.map(row => [...row]);

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
