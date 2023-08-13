import { Piece, House } from "./Entity"

export type Board<E = Piece | House | null> = Array<Array<E>>

export type BoardWithoutHouse = Board<Piece | null>
