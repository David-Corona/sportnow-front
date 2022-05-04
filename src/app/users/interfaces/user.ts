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
