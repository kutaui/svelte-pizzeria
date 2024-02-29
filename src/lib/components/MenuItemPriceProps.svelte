<script lang="ts">
  import type { MenuItemPrices } from "$lib/types/MenuItem";

  interface Props {
    name: string;
    props: MenuItemPrices[];
    addLabel: string;
  }

  let isOpen = $state(false);
  let { name, props, addLabel } = $props<Props>();
</script>

<div class="mb-2 rounded-md bg-gray-200 p-2">
  <button
    on:click={() => !isOpen}
    class="inline-flex justify-start border-0 p-1"
    type="button"
  >
    {#if isOpen}
      <img src="chevron-down.svg" alt="" class="h-6 w-6" />
    {/if}
    {#if !isOpen}
      <img src="chevron-up.svg" alt="" class="h-6 w-6" />
    {/if}
    <span>{name}</span>
    <span>({props?.length})</span>
  </button>
  <div class={isOpen ? "block" : "hidden"}>
    {#if props?.length > 0}
      {#each props as size, index (index)}
        <div class="flex items-end gap-2">
          <div>
            <label>Name</label>
            <input type="text" placeholder="Size name" value={size.name} />
          </div>
          <div>
            <label>Extra price</label>
            <input type="text" placeholder="Extra price" value={size.price} />
          </div>
          <div>
            <button type="button" class="mb-2 bg-white px-2">
              <img src="trash.svg" alt="" class="h-6 w-6" />
            </button>
          </div>
        </div>
      {/each}
    {/if}
    <button type="button" class="items-center bg-white">
      <img src="circle-plus.svg" alt="" class="h-6 w-6" />
      <span>{addLabel}</span>
    </button>
  </div>
</div>
