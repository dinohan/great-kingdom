import { IsOptional, IsString } from 'class-validator';
import { CreateGameDTO as Interface } from 'dtos';
import { Turn } from 'models';

export class CreateGameDTO implements Interface {
  @IsString()
  readonly title: string;

  @IsString()
  @IsOptional()
  turn: Turn | null = null;
}
