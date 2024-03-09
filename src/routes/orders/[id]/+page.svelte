<script lang="ts">
  import SectionHeaders from "$lib/components/SectionHeaders.svelte";
  import AddressInputs from "$lib/components/AddressInputs.svelte";
  import type { Order } from "$lib/types/Order";

  interface Props {
    data: {
      order: Order
    };
  }

  const { data } = $props<Props>();
  const { order } = data;
</script>

<section class="max-w-2xl mx-auto mt-8">
  <div class="text-center">
    <SectionHeaders mainHeader="Your order" />
    <div class="mt-4 mb-8">
      <p>Thanks for your order.</p>
      <p>We will call you when your order will be on the way.</p>
    </div>
  </div>
  {#if order}
    <div class="grid md:grid-cols-2 md:gap-16">
      <div>
        {#each order.cartProducts as product}
          <CartProduct key={product.id} product={product} />
        {/each}
        <div class="text-right py-2 text-gray-500">
          Subtotal:
          <span class="text-black font-bold inline-block w-8">${subtotal}</span>
          <br />
          Delivery:
          <span class="text-black font-bold inline-block w-8">$5</span>
          <br />
          Total:
          <span class="text-black font-bold inline-block w-8">
  ${subtotal + 5}
  </span>
        </div>
      </div>
      <div>
        <div class="bg-gray-100 p-4 rounded-lg">
          <AddressInputs
            disabled={true}
            addressProps={order}
          />
        </div>
      </div>
    </div>
  {/if}

</section>
