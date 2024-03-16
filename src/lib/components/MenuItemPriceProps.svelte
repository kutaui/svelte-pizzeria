<script lang="ts">
  import type { MenuItemPrices } from "$lib/types/MenuItem";

  interface Props {
    name: string;
    props: MenuItemPrices[];
    addLabel: string;
    update: (props: MenuItemPrices[]) => void;
    isSize: boolean;
  }

  let isOpen = $state(false);
  let { name, props, addLabel, update, isSize = false } = $props<Props>();

  function addProp() {
    const newProps = [...props, { name: "", price: 0 }];
    update(newProps);
  }

  function removeProp(index: number) {
    const newProps = props.filter((_, i) => i !== index);
    update(newProps);
  }

  function updateProp(index: number, key: string, value: string | number) {
    const newProps = props.map((prop, i) => {
      if (i === index) {
        return { ...prop, [key]: key === "price" ? Number(value) : value };
      }
      return prop;
    });
    update(newProps);
  }
</script>

<div class="mb-2 rounded-md bg-gray-200 p-2">
  <button
    on:click={() => (isOpen = !isOpen)}
    class="inline-flex justify-start border-0 p-1"
    type="button"
  >
    {#if isOpen}
      <img src="/chevron-up.svg" alt="" class="h-6 w-6" />
    {/if}
    {#if !isOpen}
      <img src="/chevron-down.svg" alt="" class="h-6 w-6" />
    {/if}
    <span>{name}</span>
    <span>({props?.length})</span>
  </button>
  <div class={isOpen ? "block" : "hidden"}>
    {#if props?.length > 0}
      {#each props as size, index (index)}
        <div class="flex items-end gap-2">
          <div>
            <label
              for={isSize ? `sizeName-${index}` : `ingredientName-${index}`}
              >Name</label
            >
            <input
              name={isSize ? `sizeName-${index}` : `ingredientName-${index}`}
              type="text"
              placeholder="Size name"
              bind:value={size.name}
              on:change={(ev) =>
                updateProp(index, "name", ev.currentTarget.value)}
            />
          </div>
          <div>
            <label
              for={isSize ? `sizePrice-${index}` : `ingredientPrice-${index}`}
              >Extra price</label
            >
            <input
              name={isSize ? `sizePrice-${index}` : `ingredientPrice-${index}`}
              type="number"
              placeholder="Extra price"
              bind:value={size.price}
              on:change={(ev) =>
                updateProp(index, "price", ev.currentTarget.value)}
            />
          </div>
          <div>
            <button
              type="button"
              class="mb-2 bg-white px-2"
              on:click={() => removeProp(index)}
            >
              <img src="/trash.svg" alt="" class="h-6 w-6" />
            </button>
          </div>
        </div>
      {/each}
    {/if}
    <button type="button" class="items-center bg-white" on:click={addProp}>
      <img src="/circle-plus.svg" alt="" class="h-6 w-6" />
      <span>{addLabel}</span>
    </button>
  </div>
</div>
