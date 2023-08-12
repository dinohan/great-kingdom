import { Entity, House } from "../models/Entity"

function Space({
  entity,
}:{
  entity: Entity | House | null,
}) {
  return (
    <div>
      { entity }
    </div>
  )
}

export default Space
