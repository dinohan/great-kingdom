import { User } from 'models';

export function isValidEmail(email: string) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

export function omitCredentials(user: User) {
  const { password, currentHashedRefreshToken, ...userWithoutCredentials } =
    user;

  return userWithoutCredentials;
}
