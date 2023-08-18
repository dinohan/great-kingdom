import { describe, it, expect } from 'vitest'

import * as utils from './gameUtils'
import { EntityAlias, Piece, BoardWithoutHouse, Turn } from 'models'
import exp from 'constants'

const { _, B, W, b, w, N } = EntityAlias

const O = true
const x = false

describe('utils test', () => {
  it('meetMoreThenFourSide', () => {
    expect(
      utils.meetMoreThenFourSide({
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
      })
    ).toBe(false)

    expect(
      utils.meetMoreThenFourSide({
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
      })
    ).toBe(true)
  })

  describe('searchBoardFrom', () => {
    it('영역을 잘 구분하는가', () => {
      expect(
        utils.searchBoardFrom(0, 0, [
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])[0]
      ).toBe(_)

      expect(
        utils.searchBoardFrom(0, 0, [
          [_, W, _, _, _, _, _, _, _],
          [W, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])[0]
      ).toBe(w)

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

  describe('buildHouseFromBoard', () => {
    it('보드에서 집을 빌드하는가', () => {
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

      expect(utils.buildHouseFromBoard(board)).toEqual([
        [w, W, _, _, B, b, B, _, _],
        [W, W, _, _, _, B, _, _, _],
        [w, w, W, _, _, _, _, _, _],
        [w, w, W, _, _, B, _, _, _],
        [w, w, W, _, N, b, B, _, _],
        [w, w, W, _, _, B, _, W, W],
        [w, w, W, _, _, _, W, B, _],
        [w, w, W, _, _, _, W, _, _],
        [w, w, W, _, _, _, W, _, _],
      ])
    })
  })

  describe('getBoardFromLog', () => {
    it('로그에서 보드를 만드는가', () => {
      expect(utils.getBoardFromLog(['B3', 'C2', 'B7'])).toEqual([
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, B, _, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, _, _, _, N, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
        [_, B, _, _, _, _, _, _, _],
        [_, _, W, _, _, _, _, _, _],
        [_, _, _, _, _, _, _, _, _],
      ])
    })
  })

  describe('isDead', () => {
    it('죽은 돌을 잘 구분하는가', () => {
      expect(
        utils.isDead(0, 0, [
          [W, B, _, _, _, _, _, _, _],
          [B, _, _, _, _, _, _, _, _],
          [_, B, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, N, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, B, _, _, _, _, _, _, _],
          [_, _, W, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toBe(true)

      expect(
        utils.isDead(0, 1, [
          [b, B, W, _, _, _, _, _, _],
          [B, W, _, _, _, _, _, _, _],
          [W, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, N, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toBe(false)

      expect(
        utils.isDead(0, 1, [
          [W, B, W, _, _, _, _, _, _],
          [B, W, _, _, _, _, _, _, _],
          [W, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, N, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toBe(true)

      expect(
        utils.isDead(4, 3, [
          [b, B, W, _, _, _, _, _, _],
          [B, W, _, _, _, _, _, _, _],
          [W, _, _, _, _, _, _, _, _],
          [_, _, _, W, _, _, _, _, _],
          [_, _, W, B, N, _, _, _, _],
          [_, _, W, B, B, W, _, _, _],
          [_, _, _, W, W, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toBe(true)
    })
  })

  describe('winByDestroy', () => {
    it('흑이 백돌을 잡았을 경우 흑이 승리한다.', () => {
      expect(
        utils.winByDestroy([
          [_, B, W, W, B, _, _, _, _],
          [_, W, B, B, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, N, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toEqual(Turn.BLACK)
    })

    it('백이 흑돌을 잡았을 경우 백이 승리한다.', () => {
      expect(
        utils.winByDestroy([
          [_, W, W, W, B, _, _, _, _],
          [_, W, B, B, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, W, B, _, _, _, _],
          [_, _, W, B, N, B, B, _, _],
          [_, _, W, B, B, W, _, _, _],
          [_, B, _, W, W, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toEqual(Turn.WHITE)
    })

    it('죽은 돌이 없을 경우 undefined를 반환한다.', () => {
      expect(
        utils.winByDestroy([
          [_, W, W, W, B, _, _, _, _],
          [_, W, B, B, _, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
          [_, _, _, W, B, _, _, _, _],
          [_, _, W, B, N, B, B, _, _],
          [_, _, W, B, B, B, _, _, _],
          [_, B, _, W, W, _, _, _, _],
          [_, _, _, _, W, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toBeUndefined()
    })
  })

  describe('bothPlayerPassed', () => {
    it('둘 다 패스했을 경우 true를 반환한다.', () => {
      expect(utils.bothPlayerPassed(['A1', 'I7', 'H3', 'A3', 'PS', 'PS'])).toBe(
        true
      )
    })
  })

  describe('getScore', () => {
    it('각 플레이어의 점수를 반환한다.', () => {
      expect(
        utils.getScore([
          [b, b, b, b, B, _, _, _, _],
          [b, b, B, B, _, _, _, _, _],
          [B, B, _, _, _, _, _, _, _],
          [_, _, _, W, B, _, _, _, _],
          [_, _, W, w, N, B, B, _, _],
          [_, _, W, w, w, B, _, _, _],
          [_, B, _, W, W, _, _, _, _],
          [_, _, _, _, W, _, _, _, _],
          [_, _, _, _, _, _, _, _, _],
        ])
      ).toEqual([6, 3])
    })
  })

  describe('winByScore', () => {
    it('흑이 3점 이상으로 크면 흑이 승리한다.', () => {
      expect(utils.winByScore(7, 2)).toEqual(Turn.BLACK)
      expect(utils.winByScore(14, 11)).toEqual(Turn.BLACK)
    })

    it('백 승리조건: 흑 점수 - 3보다 크다.', () => {
      expect(utils.winByScore(11, 14)).toEqual(Turn.WHITE)
      expect(utils.winByScore(14, 12)).toEqual(Turn.WHITE)
    })
  })
})
