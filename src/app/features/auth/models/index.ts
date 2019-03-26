export interface Authenticate {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: string;
  username: string;
  token: string;
}
