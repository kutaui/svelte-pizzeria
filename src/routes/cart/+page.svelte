<script lang="ts">
  import SectionHeaders from "$lib/components/SectionHeaders.svelte";
  import { cartStore } from "$lib/stores/CartStore.svelte";
  import CartProduct from "$lib/components/CartProduct.svelte";
  import { cartProductPrice } from "$lib/helpers";
  import AddressInputs from "$lib/components/AddressInputs.svelte";
  import type { CartItem } from "$lib/types/MenuItem";
  import { tick } from "svelte";
  import toast from "svelte-french-toast";

  let { cartItems, removeItem } = cartStore;

  const handleRemoveItem = async (product: CartItem) => {
    removeItem(product.id);
    await tick();
    subtotal = cartItems.reduce((total, p) => total + cartProductPrice(p), 0);
  };

  const { phone, streetAddress, postalCode, city, country } = $state({
    phone: "",
    streetAddress: "",
    postalCode: "",
    city: "",
    country: "",
  });

  let subtotal = $state(0);
  $effect(() => {
    subtotal = cartItems.reduce((total, p) => total + cartProductPrice(p), 0);
  });
</script>

<section class="mt-8">
  <div class="text-center">
    <SectionHeaders mainHeader="Cart" />
  </div>
  <div class="mt-8 grid grid-cols-2 gap-8">
    <div>
      {#if cartItems.length === 0}
        <div>No products in your shopping cart</div>
      {/if}
      {#if cartItems.length > 0}
        {#each cartItems as product, index (index)}
          <CartProduct {product} removeItem={handleRemoveItem} />
        {/each}
      {/if}

      <div class="flex items-center justify-end py-2 pr-16">
        <div class="text-gray-500">
          Subtotal:<br />
          Delivery:<br />
          Total:
        </div>
        <div class="pl-2 text-right font-semibold">
          ${subtotal}<br />
          $5<br />
          ${subtotal + 5}
        </div>
      </div>
    </div>
    <div class="rounded-lg bg-gray-100 p-4">
      <h2>Checkout</h2>
      <AddressInputs
        addressProps={{ phone, streetAddress, postalCode, city, country }}
      />
      <button type="button" class="submit" on:click={() =>
      toast('On its way', {
        icon: '😴',})}
      >Pay ${subtotal + 5}</button>
    </div>
  </div>
</section>
