<script lang="ts">
  import { enhance } from "$app/forms";

  interface Props {
    label: string;
    deleteID: number | undefined;
    category?: boolean;
  }

  let { label, deleteID, category = false } = $props<Props>();
  let showConfirm = $state(false);
  const action = category ? "/categories?/deleteCategory" :
    `/menu-items/edit/${deleteID}?/delete`;
</script>

{#if showConfirm}
  <div
    class="fixed inset-0 flex h-full items-center justify-center bg-black/80"
  >
    <div class="rounded-lg bg-white p-4">
      <div>Are you sure you want to delete?</div>
      <div class="mt-1 flex gap-2">
        <button type="button" on:click={() => (showConfirm = false)}>
          Cancel
        </button>
        <form method="POST" action={action}>
          <input name="deleteID" type="hidden" value={deleteID} />
          <button type="submit" class="primary">
            Yes,&nbsp;delete!
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}

<button type="button" on:click={() => (showConfirm = true)}>
  {label}
</button>
