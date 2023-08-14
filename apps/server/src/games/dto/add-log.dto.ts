import { IsString } from 'class-validator';
import { Coordinate } from 'models';

export class AddLogDTO {
  @IsString()
  readonly coordinate: Coordinate;
}
