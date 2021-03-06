import { User } from "./user";

export interface TokenResponse {
  access_token: string;
}

export interface UserResponse {
  user: User;
}

export interface UsersResponse {
  users: User[];
}
