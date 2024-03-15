<script lang="ts">
  import type { MenuItem } from "$lib/types/MenuItem";

  type Props = {
    base_price: number;
    onClick: (item: MenuItem) => void;
    hasSizesOrExtras: boolean;
  };

  let { base_price, onClick, hasSizesOrExtras } = $props<Props>();
</script>

{#if hasSizesOrExtras}
  <div class="flying-button-parent mt-4">
    <button>
      Add to cart {base_price}
    </button>
  </div>
{:else}
  <button type="button" class="mt-4 rounded-full bg-primary px-8 py-2 text-white"
          on:click={onClick}>
    <span>Add to cart (from {base_price}$)</span></button>
{/if}
