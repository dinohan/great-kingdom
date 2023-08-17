const ACCESS_TOKEN_KEY = 'access-token'

class AuthService {
  accessToken: string | null = null

  constructor() {
    this.accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
  }

  saveAccessToken(accessToken: string) {
    this.accessToken = accessToken
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }

  invalidateAccessToken() {
    this.accessToken = null
    localStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

const authService = new AuthService()

export default authService
