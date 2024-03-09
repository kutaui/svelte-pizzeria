<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import type { MenuItem } from "$lib/types/MenuItem";


  interface Props {
    data: {
      menuItems: MenuItem[];
    };
  }

  const { data } = $props<Props>();
  const menuItems = data.menuItems;
</script>

<section class="mx-auto mt-8 max-w-2xl">
  <UserTabs isAdmin={true} />
  <div class="mt-8">
    <a class="button flex" href={"/menu-items/new"}>
      <span>Crete new menu item</span>
      <img src="/arrow-right-black.svg" alt="" class="h-6 w-6" />
    </a>
  </div>
  <div>
    <h2 class="mt-8 text-sm text-gray-500">Edit menu item:</h2>
    <div class="grid grid-cols-3 gap-2">
      {#if menuItems?.length > 0}
        {#each menuItems as item (item.id)}
          <a
            href={"/menu-items/edit/" + item.id}
            class="rounded-lg bg-gray-200 p-4"
          >
            <div class="relative">
              <img
                class="rounded-md"
                src={item.image}
                alt={""}
                width={200}
                height={200}
              />
            </div>
            <div class="text-center">
              {item.name}
            </div>
          </a>
        {/each}
      {/if}
    </div>
  </div>
</section>
