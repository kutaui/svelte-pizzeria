<script lang="ts">
  import type { CartItem } from "$lib/types/MenuItem";
  import { cartProductPrice } from "$lib/helpers";
  import toast from "svelte-french-toast";

  interface Props {
    product: CartItem;
    removeItem?: (prod: CartItem) => void;
  }

  const { product, removeItem } = $props<Props>();
  const handleRemoveItem = () => {
    if (removeItem) {
      removeItem(product);
      toast.success("Item removed from cart");
    }
  };
</script>

<div class="flex items-center gap-4 border-b py-4">
  <div class="w-24">
    <img width={240} height={240}
         src={product.image}
         alt={""} />
  </div>
  <div class="grow">
    <h3 class="font-semibold">
      {product.name}
    </h3>
    {#if product?.size}
      <div class="text-sm">
        Size: <span>{product.size.name}</span>
      </div>
    {/if}
    {#if product.extras && product.extras?.length > 0}
      {#each product.extras as extra (extra.name)}
        <div class="text-sm text-gray-500">
          <div>{extra.name} ${+extra.price}</div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="text-lg font-semibold">
    ${+cartProductPrice(product)}
  </div>
  <div class="ml-2">
    <button type="button" on:click={() => handleRemoveItem()} class="p-2">
      <img src="/trash.svg" alt="" class="h-6 w-6" />
    </button>
  </div>
</div>
