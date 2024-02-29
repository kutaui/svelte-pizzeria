export interface MenuItem {
  id?: number;
  image: string;
  name: string;
  description: string;
  categoryId: number;
  basePrice: string;
  sizes: MenuItemPrices[];
  extraIngredientPrices: MenuItemPrices[];
  createdAt?: Date;
}

export interface MenuItemPrices {
  name: string;
  price: string;
}
