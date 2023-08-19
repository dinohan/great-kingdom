import { IsOptional, IsString } from 'class-validator';
import { CreateGameDTO as Interface } from 'dtos';
import { Turn } from 'models';

export class CreateGameDTO implements Interface {
  @IsString()
  @IsOptional()
  turn: Turn | null = null;
}
