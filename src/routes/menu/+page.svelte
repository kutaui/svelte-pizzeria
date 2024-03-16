<script lang="ts">
  import SectionHeaders from "$lib/components/SectionHeaders.svelte";
  import type { MenuItem } from "$lib/types/MenuItem";
  import type { Category } from "$lib/types/Category";
  import MenuItemComponent from "$lib/components/MenuItem.svelte";

  interface Props {
    data: {
      menuItems: MenuItem[];
      categories: Category[];
    };
  }

  const { data } = $props<Props>();
  const { menuItems, categories } = data;
</script>

<section class="mt-8">
  {#if categories.length > 0}
    {#each categories as c (c.id)}
      <div>
        <div class="text-center">
          <SectionHeaders mainHeader={c.name} />
        </div>
        <div class="mb-12 mt-6 grid gap-4 sm:grid-cols-3">
          {#each menuItems.filter((item) => item.category_id === Number(c.id)) as item}
            <MenuItemComponent menuItem={item} />
          {/each}
        </div>
      </div>
    {/each}
  {/if}
</section>
