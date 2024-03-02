<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import DeleteButton from "$lib/components/DeleteButton.svelte";
  import type { Category } from "$lib/types/Category";
  import type { ActionData } from "./$types";

  async function handleDeleteClick(id) {
  }

  interface Props {
    data: {
      categories: Category[];
    };
    form: ActionData;
  }

  interface State {
    categoryName: string;
    editedCategory: Category | null;
  }

  let { categoryName, editedCategory } = $state<State>({
    categoryName: "",
    editedCategory: null,
  });

  let { data, form } = $props<Props>();
  const categories = data?.categories;
  $effect(() => {
    console.log(form);
  });
</script>

<section class="mx-auto mt-8 max-w-2xl">
  <UserTabs isAdmin={true} />
  <form class="mt-8" method="POST" action="/categories?/categories">
    <input type="hidden" name="update" value={!!editedCategory} />
    <input type="hidden" name="categoryId" value={editedCategory?.id} />
    <div class="flex items-end gap-2">
      <div class="grow">
        <label for="categoryName">
          {#if editedCategory}
            Update category
          {:else}
            New category name
          {/if}
          {#if editedCategory}
            : <b>{editedCategory.name}</b>
          {/if}
        </label>
        <input name="categoryName" type="text" bind:value={categoryName} />
      </div>
      <div class="flex gap-2 pb-2">
        <button class="border border-primary" type="submit">
          {editedCategory ? "Update" : "Create"}
        </button>
        <button
          type="button"
          on:click={() => {
            editedCategory = null;
            categoryName = "";
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
  <div>
    <h2 class="mt-8 text-sm text-gray-500">Existing categories</h2>
    {#if categories?.length > 0}
      {#each categories as c (c.id)}
        <div
          class="mb-1 flex items-center gap-1 rounded-xl bg-gray-100 p-2 px-4"
        >
          <div class="grow">{c.name}</div>
          <div class="flex gap-1">
            <button
              type="button"
              on:click={() => {
                editedCategory = c;
                categoryName = c.name;
              }}
            >
              Edit
            </button>
            <DeleteButton label="Delete" deleteID={c.id} category />
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
