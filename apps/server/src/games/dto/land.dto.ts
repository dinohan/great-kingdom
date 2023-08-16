import { IsString } from 'class-validator';
import { Coordinate } from 'models';
import { LandDTO as Interface } from 'dtos';

export class LandDTO implements Interface {
  @IsString()
  readonly coordinate: Coordinate;
}
