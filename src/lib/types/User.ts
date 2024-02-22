export interface User {
  id?: number;
  email?: string;
  password?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  phone?: string;
  admin?: boolean;
  image?: string;
}

export interface UserWithoutPassword extends Omit<User, "password"> {}
