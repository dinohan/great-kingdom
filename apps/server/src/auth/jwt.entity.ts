import { User } from 'models';

export interface JWTUser {
  id: User['id'];
}
