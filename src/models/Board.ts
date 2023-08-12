import { Entity, House } from "./Entity"

export type Board<E = Entity | House | null> = Array<Array<E>>

export type BoardWithoutHouse = Board<Entity | null>
