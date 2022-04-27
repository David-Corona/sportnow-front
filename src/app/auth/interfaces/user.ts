export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  latitude: number;
  longitude: number;
  me?: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
  lat?: number;
  lng?: number;
}
