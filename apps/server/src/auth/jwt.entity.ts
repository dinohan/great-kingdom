import { User } from 'src/users/users.entity';

export interface JWTUser {
  id: User['id'];
}
