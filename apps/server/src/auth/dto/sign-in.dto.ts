import { IsString } from 'class-validator';
import { SignInDTO as Interface } from 'dtos';

export class SignInDTO implements Interface {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
