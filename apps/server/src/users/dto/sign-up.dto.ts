import { IsString } from 'class-validator';
import { SignUpDTO as Interface } from 'dtos';

export class SignUpDTO implements Interface {
  @IsString()
  readonly email: string;

  @IsString()
  readonly nickname: string;
}
