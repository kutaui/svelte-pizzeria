<script lang="ts">
  import SectionHeaders from "$lib/components/SectionHeaders.svelte";
  import { cartStore } from "$lib/stores/CartStore.svelte";
  import CartProduct from "$lib/components/CartProduct.svelte";
  import { cartProductPrice } from "$lib/helpers";
  import AddressInputs from "$lib/components/AddressInputs.svelte";
  import type { CartItem } from "$lib/types/MenuItem";
  import { tick } from "svelte";

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
  <div class="mt-8 grid gap-8 grid-cols-2">
    <div>
      {#if cartItems.length === 0}
        <div>No products in your shopping cart</div>
      {/if}
      {#if cartItems.length > 0}
        {#each cartItems as product, index (index)}
          <CartProduct
            product={product}
            removeItem={handleRemoveItem}
          />
        {/each}
      {/if}


      <div class="py-2 pr-16 flex justify-end items-center">
        <div class="text-gray-500">
          Subtotal:<br />
          Delivery:<br />
          Total:
        </div>
        <div class="font-semibold pl-2 text-right">
          ${subtotal}<br />
          $5<br />
          ${subtotal + 5}
        </div>
      </div>
    </div>
    <div class="bg-gray-100 p-4 rounded-lg">
      <h2>Checkout</h2>
      <AddressInputs
        addressProps={{ phone, streetAddress, postalCode, city, country }}
      />
      <button type="submit">Pay ${subtotal + 5}</button>
    </div>
  </div>
</section>
