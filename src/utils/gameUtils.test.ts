import { describe, it, expect} from 'vitest'

import * as utils from './gameUtils'
import { EntityAlias, Piece } from '../models/Entity'
import { BoardWithoutHouse } from '../models/Board'

const {
  _,
  B,
  W,
  b,
  w,
  N,
} = EntityAlias

const O = true
const x = false

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
      [Piece.White]: false,
      [Piece.Black]: false,
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
      [Piece.White]: false,
      [Piece.Black]: false,
    })).toBe(true)
  })


  describe('searchBoardFrom', () => {
    it('영역을 잘 구분하는가', () => {
      expect(utils.searchBoardFrom(0, 0, [
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
      ])[0]).toBe(_)
  
      expect(utils.searchBoardFrom(0, 0, [
        [_, W, _, _, _, _, _, _, _],
        [W, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
      ])[0]).toBe(w)
  
      const board2: BoardWithoutHouse = [
        [_, W, _, _, B, _, B, _, _],
        [W, W, _, _, _, B, _, _, _],
        [_, _, W, _, _, _, _, _, _],
        [_, _, W, _, _, B, _, _, _],
        [_, _, W, _, N, _, B, _, _],
        [_, _, W, _, _, B, _, W, W],
        [_, _, W, _, _, _, W, B, _],
        [_, _, W, _, _, _, W, _, _],
        [_, _, W, _, _, _, W, _, _],
      ]
  
      expect(utils.searchBoardFrom(0, 0, board2)[0]).toBe(w)
      expect(utils.searchBoardFrom(3, 0, board2)[0]).toBe(w)
      expect(utils.searchBoardFrom(3, 1, board2)[0]).toBe(w)
  
      expect(utils.searchBoardFrom(0, 5, board2)[0]).toBe(b)
      expect(utils.searchBoardFrom(4, 5, board2)[0]).toBe(b)
  
      expect(utils.searchBoardFrom(3, 2, board2)[0]).toBe(W)
      expect(utils.searchBoardFrom(3, 3, board2)[0]).toBe(_)
      expect(utils.searchBoardFrom(8, 8, board2)[0]).toBe(_)
    })

    it('연결된 모든 공간을 탐색하는가', () => {
      const board: BoardWithoutHouse = [
        [_, W, _, _, B, _, B, _, _],
        [W, W, _, _, _, B, _, _, _],
        [_, _, W, _, _, _, _, _, _],
        [_, _, W, _, _, B, _, _, _],
        [_, _, W, _, N, _, B, _, _],
        [_, _, W, _, _, B, _, W, W],
        [_, _, W, _, _, _, W, B, _],
        [_, _, W, _, _, _, W, _, _],
        [_, _, W, _, _, _, W, _, _],
      ]

      expect(utils.searchBoardFrom(3, 0, board)[1]).toEqual([
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
        [O, O, x, x, x, x, x, x, x],
      ])

      expect(utils.searchBoardFrom(8, 8, board)[1]).toEqual([
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, x],
        [x, x, x, x, x, x, x, x, O],
        [x, x, x, x, x, x, x, O, O],
        [x, x, x, x, x, x, x, O, O],
      ])
    })
  })

  describe('copyBoard', () => {
    it('보드를 복사하는가', () => {
      const board: BoardWithoutHouse = [
        [_, W, _, _, B, _, B, _, _],
        [W, W, _, _, _, B, _, _, _],
        [_, _, W, _, _, _, _, _, _],
        [_, _, W, _, _, B, _, _, _],
        [_, _, W, _, N, _, B, _, _],
        [_, _, W, _, _, B, _, W, W],
        [_, _, W, _, _, _, W, B, _],
        [_, _, W, _, _, _, W, _, _],
        [_, _, W, _, _, _, W, _, _],
      ]

      const copiedBoard = utils.copyBoard(board)

      expect(copiedBoard).toEqual(board)
      expect(copiedBoard).not.toBe(board)
    })
  })

  describe('generateBoard', () => {
    it('주어진 값으로 보드를 채우는가', () => {
      expect(utils.generateBoard(false)).toEqual([
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
      ])

      expect(utils.generateBoard(null)).toEqual([
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null],
      ])
    })
  })
})