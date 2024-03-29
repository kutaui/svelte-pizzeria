<script lang="ts">
  import type { MenuItem, MenuItemPrices } from "$lib/types/MenuItem";
  import type { Category } from "$lib/types/Category";
  import MenuItemPriceProps from "$lib/components/MenuItemPriceProps.svelte";
  import { enhance } from "$app/forms";

  interface Props {
    menuItem: MenuItem | null;
    categories: Category[];
    editItem: boolean;
    form: any;
  }

  let { menuItem, categories, editItem = false, form } = $props<Props>();
  const action = editItem
    ? `/menu-items/edit/${menuItem?.id}?/edit`
    : "/menu-items/new?/create";

  let {
    name,
    description,
    category,
    basePrice,
    sizes,
    extra_ingredient_prices,
    image,
  } = $state({
    name: menuItem?.name || "",
    description: menuItem?.description || "",
    category: menuItem?.category_id || "",
    basePrice: menuItem?.base_price || "",
    sizes: menuItem?.sizes || [],
    extra_ingredient_prices: menuItem?.extra_ingredient_prices || [],
    image: menuItem?.image || "",
  });
  let sizesJSON = $derived(JSON.stringify(sizes));
  let extra_ingredient_pricesJSON = $derived(
    JSON.stringify(extra_ingredient_prices),
  );

  function updateSizes(newSizes: MenuItemPrices[]) {
    sizes = newSizes;
  }

  function updateExtraIngredientPrices(
    newExtraIngredientPrices: MenuItemPrices[],
  ) {
    extra_ingredient_prices = newExtraIngredientPrices;
  }


</script>

<form
  class="mx-auto mt-8 max-w-2xl"
  method="POST"
  {action}
  use:enhance={() => {
    return async ({ update }) => {
      update({ reset: !editItem });
    };
  }}
  enctype="multipart/form-data"
>
  <div
    class="items-start gap-4 md:grid"
    style="grid-template-columns: .3fr .7fr"
  >
    <div>
      {#if menuItem?.image}
        <img
          class="mb-1 h-full w-full rounded-lg"
          src={menuItem?.image}
          width={250}
          height={250}
          alt={"avatar"}
        />
      {/if}
      {#if !menuItem?.image}
        <div class="mb-1 rounded-lg bg-gray-200 p-4 text-center text-gray-500">
          No image
        </div>
      {/if}
      <label>
        <input name="image" type="file" class="hidden"
        />
        <span
          class="block cursor-pointer rounded-lg border border-gray-300 p-2 text-center">Change image</span>
      </label>
    </div>
    <div class="grow">
      <label for="name">Item name</label>
      <input name="name" type="text" value={name} />
      <label for="description">Description</label>
      <input name="description" type="text" value={description} />
      <label for="category">Category</label>
      <select name="category" bind:value={category}>
        {#if categories?.length >= 0}
          {#each categories as c (c.id)}
            <option value={c.id}>{c.name}</option>
          {/each}
        {/if}
      </select>
      <label for="basePrice">Base price</label>
      <input name="basePrice" type="number" value={basePrice} />
      <MenuItemPriceProps
        name={"Sizes"}
        addLabel={"Add item size"}
        props={sizes}
        update={updateSizes}
        isSize
      />

      <MenuItemPriceProps
        name={"Extra ingredients"}
        addLabel={"Add ingredients prices"}
        props={extra_ingredient_prices}
        update={updateExtraIngredientPrices}
        isSize={false}
      />
      <input name="sizes" type="hidden" value={sizesJSON} />
      <input
        name="extra_ingredient_prices"
        type="hidden"
        value={extra_ingredient_pricesJSON}
      />

      <button type="submit">Save</button>
    </div>
  </div>
</form>
