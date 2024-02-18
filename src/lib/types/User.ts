export interface User {
  id?: number;
  email: string;
  password: string;
}

export interface UserWithoutPassword extends Omit<User, "password"> {}
