<script lang="ts">
  type Props = {
    base_price: number;
    onClick: () => void;
  };

  let { base_price, onClick } = $props<Props>();
</script>

<button
  type="button"
  class="mt-4 rounded-full bg-primary px-8 py-2 text-white"
  on:click={onClick}
>
  <span>Add to cart (from {base_price}$)</span>
</button>
