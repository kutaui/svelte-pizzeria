export interface MenuItem {
  id?: number;
  image: string;
  name: string;
  description: string;
  category_id: number;
  base_price: number;
  sizes: MenuItemPrices[];
  extra_ingredient_prices: MenuItemPrices[];
  createdAt?: Date;
  size?: MenuItemPrices;
  extras?: MenuItemPrices[];
}

export interface CartItem extends Omit<MenuItem, "description"> {}

export interface MenuItemPrices {
  name: string;
  price: number;
}
