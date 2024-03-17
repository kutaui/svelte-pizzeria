<script lang="ts">
  import AddToCartButton from "./AddToCartButton.svelte";

  interface Props {
    item: {
      name: string;
      description: string;
      image: string;
      base_price: number;
    };
    onAddToCart: () => void;
  }

  let { onAddToCart, item } = $props<Props>();
  let { name, description, image, base_price } = item;
</script>

<div
  class="group rounded-lg bg-gray-200 p-4
      text-center transition-all hover:bg-white hover:shadow-md hover:shadow-black/25"
>
  <div class="text-center">
    <img src={image} class="max-h-auto mx-auto block max-h-24"
         alt="pizza" />
  </div>
  <h4 class="my-3 text-xl font-semibold">{name}</h4>
  <p class="line-clamp-3 text-sm text-gray-500">
    {description}
  </p>
  <AddToCartButton onClick={onAddToCart} {base_price} />
</div>
