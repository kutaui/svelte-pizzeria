export interface MenuItem {
  id?: number;
  image: string;
  name: string;
  description: string;
  categoryId: number;
  basePrice: string;
  sizes: { name: string; price: string }[];
  extraIngredientPrices: { name: string; price: string }[];
  createdAt?: Date;
}
