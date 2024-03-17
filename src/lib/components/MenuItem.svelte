<script lang="ts">
  import MenuItemTile from "$lib/components/MenuItemTile.svelte";
  import type { MenuItem, MenuItemPrices } from "$lib/types/MenuItem";
  import { cartStore } from "$lib/stores/CartStore.svelte";

  interface Props {
    menuItem: MenuItem;
  }

  let { menuItem } = $props<Props>();
  let { name, description, image, base_price, sizes, extra_ingredient_prices } =
    $state<MenuItem>(menuItem);
  let showPopup = $state(false);
  let selectedSize = $state(sizes[0]);
  let selectedExtras = $state<MenuItemPrices[]>([]);
  const { addItem } = cartStore;
  let selectedPrice = $state(+base_price);

  function handleExtraThingClick(ev: Event, extraThing: MenuItemPrices) {
    const checked = (ev.target as HTMLInputElement).checked;
    if (checked) {
      selectedExtras.push(extraThing);
    } else {
      selectedExtras = selectedExtras.filter(
        (e: MenuItemPrices) => e.name !== extraThing.name,
      );
    }
  }

  async function handleAddToCartButtonClick() {
    const hasOptions = sizes.length > 0 || extra_ingredient_prices.length > 0;
    if (hasOptions && !showPopup) {
      showPopup = true;
      return;
    }
    addItem(menuItem, selectedSize, selectedExtras);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    showPopup = false;
  }

  $effect(() => {
    let newSelectedPrice = +base_price;

    if (selectedSize) {
      newSelectedPrice += +selectedSize.price;
    }

    newSelectedPrice += +selectedExtras.reduce((acc, e) => acc + +e.price, 0);
    if (+newSelectedPrice !== +selectedPrice) {
      selectedPrice = newSelectedPrice;
    }
  });
</script>

{#if showPopup}
  <div
    role="button"
    onkeydown={() => (showPopup = false)}
    tabindex="0"
    on:click={() => (showPopup = false)}
    class="fixed inset-0 flex items-center justify-center bg-black/80"
  >
    <div
      role="button"
      onkeydown={() => (showPopup = false)}
      tabindex="0"
      on:click={(ev) => ev.stopPropagation()}
      class="my-8 max-w-md rounded-lg bg-white p-2"
    >
      <div
        class="overflow-y-scroll p-2"
        style="maxHeight: calc(100vh - 100px);"
      >
        <img src={image} alt={name} width={300} height={300}
             class="mx-auto" />
        <h2 class="mb-2 text-center text-lg font-bold">{name}</h2>
        <p class="mb-2 text-center text-sm text-gray-500">
          {description}
        </p>
        {#if sizes.length > 0}
          <div class="py-2">
            <h3 class="text-center text-gray-700">Pick your size</h3>
            {#each sizes as size (size.name)}
              <label class="mb-1 flex items-center gap-2 rounded-md border p-4">
                <input
                  type="radio"
                  on:change={() => (selectedSize = size)}
                  checked={selectedSize?.name === size.name}
                  name="size"
                />
                {size.name} ${Number(base_price) + Number(size.price)}
              </label>
            {/each}
          </div>
        {/if}

        {#if extra_ingredient_prices?.length > 0}
          <div class="py-2">
            <h3 class="text-center text-gray-700">Any extras?</h3>
            {#each extra_ingredient_prices as extraThing (extraThing.name)}
              <label class="mb-1 flex items-center gap-2 rounded-md border p-4">
                <input
                  type="checkbox"
                  on:change={(ev) => handleExtraThingClick(ev, extraThing)}
                  checked={selectedExtras
                    .map((e) => e.name)
                    .includes(extraThing.name)}
                  name={extraThing.name}
                />
                {extraThing.name} +${+extraThing.price}
              </label>
            {/each}
          </div>
        {/if}

        <button
          class="primary sticky bottom-2"
          on:click={handleAddToCartButtonClick}
        >
          Add to cart ${selectedPrice}
        </button>
        <button class="mt-2" on:click={() => (showPopup = false)}>
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}

<MenuItemTile onAddToCart={handleAddToCartButtonClick} item={menuItem} />
