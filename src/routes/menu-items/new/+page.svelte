<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import MenuItemForm from "$lib/components/MenuItemForm.svelte";
  import type { Category } from "$lib/types/Category";
  import type { ActionData } from "./$types";

  interface Props {
    data: {
      categories: Category[];
    };
    form: ActionData;
  }

  let { data } = $props<Props>();
  const { categories } = data;
</script>

<section class="mt-8">
  <UserTabs isAdmin={true} />
  <div class="mx-auto mt-8 max-w-2xl">
    <a href={"/menu-items"} class="button">
      <img src="/arrow-right-black.svg" alt="" class="h-6 w-6 rotate-180" />
      <span>Show all menu items</span>
    </a>
  </div>
  <MenuItemForm menuItem={null} {categories} editItem={false} />
</section>
