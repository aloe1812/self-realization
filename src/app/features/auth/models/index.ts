export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthResponse {
  username: string;
  token: string;
}
