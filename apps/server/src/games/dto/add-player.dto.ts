import { IsString } from 'class-validator';

export class AddPlayerDTO {
  @IsString()
  readonly playerId: string;
}
