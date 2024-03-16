<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import MenuItemForm from "$lib/components/MenuItemForm.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import type { MenuItem } from "$lib/types/MenuItem";
  import type { Category } from "$lib/types/Category";

  interface Props {
    data: {
      menuItem: MenuItem;
      categories: Category[];
    };
  }

  let { data } = $props<Props>();
  const { menuItem, categories } = data;
</script>

<section class="mt-8">
  <UserTabs isAdmin={true} />
  <div class="mx-auto mt-8 max-w-2xl">
    <a href={"/menu-items"} class="button">
      <img src="/arrow-right-black.svg" alt="" class="h-6 w-6 rotate-180" />
      <span>Show all menu items</span>
    </a>
  </div>
  <MenuItemForm {menuItem} {categories} editItem />
  <div class="mx-auto mt-2 max-w-md">
    <div class="ml-auto max-w-xs pl-4">
      <DeleteButton label="Delete this menu item" deleteID={menuItem.id} />
    </div>
  </div>
</section>
