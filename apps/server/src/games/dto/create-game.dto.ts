import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateGameDto {
  @IsString()
  readonly title: string;
}
