import { Entity } from "./Entity"

export type Board<E = Entity | null> = Array<Array<E>>

export type BoardWithoutHouse = Board<Entity.Black | Entity.White | Entity.Neutral | null>
