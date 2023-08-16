import { IsString } from 'class-validator';
import { CreateGameDTO as Interface } from 'dtos';

export class CreateGameDTO implements Interface {
  @IsString()
  readonly title: string;
}
