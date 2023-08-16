import { IsString } from 'class-validator';
import { JoinDTO as Interface } from 'dtos';

export class JoinDTO implements Interface {
  @IsString()
  readonly playerId: string;
}
