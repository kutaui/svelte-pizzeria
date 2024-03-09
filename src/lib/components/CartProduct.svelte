<script lang="ts">
  import type { MenuItem } from "$lib/types/MenuItem";
  import { cartProductPrice } from "$lib/helpers";

  interface Props {
    product: MenuItem;
    remove?: boolean;
  }

  const { product, remove = false } = $props<Props>();
</script>
<div class="flex items-center gap-4 border-b py-4">
  <div class="w-24">
    <img width={240} height={240} src={product.image} alt={''} />
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
    {#if product.extras?.length > 0}
      {#each product.extras as extra}
        <div class="text-sm text-gray-500">
          <div key={extra.name}>{extra.name} ${extra.price}</div>
        </div>
      {/each}
    {/if}
  </div>
  <div class="text-lg font-semibold">
    ${cartProductPrice(product)}
  </div>
  {#if !!remove }
    <div class="ml-2">
      <button
        type="button"
        class="p-2">
        <img src="/trash.svg" alt="" class="h-6 w-6" />
      </button>
    </div>
  {/if}
</div>
