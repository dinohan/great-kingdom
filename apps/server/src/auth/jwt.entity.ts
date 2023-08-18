import { User } from 'dtos';

export interface JWTUser {
  id: User['id'];
}

export interface RequestWithJWT extends Request {
  user: JWTUser;
}
