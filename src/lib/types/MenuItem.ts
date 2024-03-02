export interface MenuItem {
  id?: number;
  image: string;
  name: string;
  description: string;
  category_id: number;
  base_price: number;
  sizes: MenuItemPrices[];
  extraIngredientPrices: MenuItemPrices[];
  createdAt?: Date;
}

export interface MenuItemPrices {
  name: string;
  price: number;
}
