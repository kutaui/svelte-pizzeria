import type { MenuItem } from "$lib/types/MenuItem";

export interface Order {
  id: string;
  userEmail: string;
  phone: string;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  cartProducts: MenuItem[];
  paid: boolean;
  createdAt: Date;
}
