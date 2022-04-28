class AuthService {
  public static refreshToken() {
    return {
      message: 'refresh token',
    }
  }

  public static login() {
    return {
      message: 'Login',
    }
  }
}

export { AuthService }
