export interface User {
  id?: number;
  name?: string | null;
  email?: string | null;
  password?: string;
  streetAddress?: string | null;
  postalCode?: string | null;
  city?: string | null;
  country?: string | null;
  phone?: string | null;
  admin?: boolean;
  image?: string | null;
}

export interface UserWithoutPassword extends Omit<User, "password"> {}
