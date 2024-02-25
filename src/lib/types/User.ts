export interface User {
  id: number;
  name: string | null;
  email: string | null;
  password: string;
  streetAddress: string | null;
  postalCode: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  admin: boolean;
  image: string | null;
  createdAt: Date | null;
}

export interface UserWithoutPassword extends Omit<User, "password"> {}

export interface Profile extends Omit<UserWithoutPassword, "id" | "email"> {}
