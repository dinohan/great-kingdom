import { describe, it, expect} from 'vitest'

import * as utils from './gameUtils'
import { EntityAlias } from '../models/Entity'
import { BoardWithoutHouse } from '../models/Board'

const {
  _,
  B,
  W,
  N,
} = EntityAlias

describe('utils test', () => {
  it('meetMoreThenFourSide', () => {
    expect(utils.meetMoreThenFourSide({
      boardTop: false,
      boardBottom: false,
      boardLeft: false,
      boardRight: false,
      neutralTop: false,
      neutralBottom: false,
      neutralLeft: false,
      neutralRight: false,
    })).toBe(false)

    expect(utils.meetMoreThenFourSide({
      boardTop: true,
      boardBottom: false,
      boardLeft: true,
      boardRight: true,
      neutralTop: true,
      neutralBottom: false,
      neutralLeft: false,
      neutralRight: false,
    })).toBe(true)
  })

  it('isHouse', () => {
    expect(utils.isHouse(0, 0, [
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
    ],W)).toBe(false)

    expect(utils.isHouse(0, 0, [
      [_, W, _, _, _, _, _, _, _],
      [W, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
      [_, _, _, _, _, _, _, _, _],
    ],W)).toBe(true)

    const board2 = [
      [_, W, _, _, _, _, _, _, _],
      [W, W, _, _, _, _, _, _, _],
      [_, _, W, _, _, _, _, _, _],
      [_, _, W, _, _, _, _, _, _],
      [_, _, W, _, N, _, _, _, _],
      [_, _, W, _, _, _, _, W, W],
      [_, _, W, _, _, _, W, B, _],
      [_, _, W, _, _, _, W, _, _],
      [_, _, W, _, _, _, W, _, _],
    ] as BoardWithoutHouse

    expect(utils.isHouse(3, 0, board2, W)).toBe(true)
    expect(utils.isHouse(3, 1, board2, W)).toBe(true)
    expect(utils.isHouse(3, 2, board2, W)).toBe(false)
    expect(utils.isHouse(3, 3, board2, W)).toBe(false)
    expect(utils.isHouse(8, 8, board2, W)).toBe(false)
  })
})