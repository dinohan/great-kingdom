import { User } from 'models';

export interface JWTUser {
  id: User['id'];
}

export interface RequestWithUser extends Request {
  user: JWTUser;
}
