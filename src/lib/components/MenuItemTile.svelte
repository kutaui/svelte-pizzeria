<script lang="ts">
  import AddToCartButton from "./AddToCartButton.svelte";
  import type { MenuItem } from "$lib/types/MenuItem";

  interface Props {
    item: {
      name: string;
      description: string;
      image: string;
      base_price: number;
      hasSizesOrExtras: boolean;
    };
    onAddToCart: (item: MenuItem) => void;

  }

  let { onAddToCart, item } = $props<Props>();
  let { name, description, image, base_price, hasSizesOrExtras } = item;
</script>
<div class="bg-gray-200 p-4 rounded-lg text-center
      group hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
  <div class="text-center">
    <img src={image} class="max-h-auto max-h-24 block mx-auto" alt="pizza" />
  </div>
  <h4 class="font-semibold text-xl my-3">{name}</h4>
  <p class="text-gray-500 text-sm line-clamp-3">
    {description}
  </p>
  <AddToCartButton
    hasSizesOrExtras={hasSizesOrExtras}
    onClick={onAddToCart}
    base_price={base_price}
  />
</div>
