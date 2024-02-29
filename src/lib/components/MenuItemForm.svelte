<script lang="ts">
  import EditableImage from "$lib/components/EditableImage.svelte";
  import type { MenuItem, MenuItemPrices } from "$lib/types/MenuItem";
  import type { Category } from "$lib/types/Category";
  import MenuItemPriceProps from "$lib/components/MenuItemPriceProps.svelte";

  interface Props {
    data: {
      menuItem: MenuItem;
      categories: Category[];
    };
  }

  let { data } = $props<Props>();
  let { menuItem, categories } = data;
  let {
    name,
    description,
    category,
    basePrice,
    sizes,
    extraIngredientPrices,
    image,
  } = $state({
    name: menuItem?.image || "",
    description: menuItem?.description || "",
    category: menuItem?.categoryId || "",
    basePrice: menuItem?.basePrice || "",
    sizes: menuItem?.sizes || [],
    extraIngredientPrices: menuItem?.extraIngredientPrices || [],
    image: menuItem?.image || "",
  });
</script>

<form class="mx-auto mt-8 max-w-2xl" method="POST">
  <div
    class="items-start gap-4 md:grid"
    style="grid-template-columns: .3fr .7fr"
  >
    <div>
      <EditableImage link={image} />
    </div>
    <div class="grow">
      <label>Item name</label>
      <input type="text" value={name} />
      <label>Description</label>
      <input type="text" value={description} />
      <label>Category</label>
      <select value={category}>
        {#if categories.length >= 0}
          {#each categories as c (c.id)}
            <option value={c.id}>{c.name}</option>
          {/each}
        {/if}
      </select>
      <label>Base price</label>
      <input type="text" value={basePrice} />
      <MenuItemPriceProps
        name={"Sizes"}
        addLabel={"Add item size"}
        props={sizes}
      />
      <MenuItemPriceProps
        name={"Extra ingredients"}
        addLabel={"Add ingredients prices"}
        props={extraIngredientPrices}
      />
      <button type="submit">Save</button>
    </div>
  </div>
</form>
