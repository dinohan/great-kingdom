import { Entity } from "../models/Entity"

function Space({
  entity,
}:{
  entity: Entity | null,
}) {
  return (
    <div>
      { entity }
    </div>
  )
}

export default Space
