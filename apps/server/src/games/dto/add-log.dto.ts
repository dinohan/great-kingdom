import { IsString } from 'class-validator';

export class AddLogDTO {
  @IsString()
  readonly log: string;
}
