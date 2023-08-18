import { IsString } from 'class-validator';
import { Land } from 'models';
import { LandDTO as Interface } from 'dtos';

export class LandDTO implements Interface {
  @IsString()
  readonly land: Land;
}
