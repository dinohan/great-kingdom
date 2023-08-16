export interface UserKey {
  id: string;
}

export interface User extends UserKey {
  email: string;
  nickname: string;
  password: string;
}
