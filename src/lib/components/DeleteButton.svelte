<script lang="ts">
  import { enhance } from "$app/forms";

  interface Props {
    label: string;
    categoryID: number | undefined;
  }

  let { label, categoryID } = $props<Props>();
  let showConfirm = $state(false);
</script>

{#if showConfirm}
  <form method="POST" action="/categories?/deleteCategory">
    <div
      class="fixed inset-0 flex h-full items-center justify-center bg-black/80"
    >
      <div class="rounded-lg bg-white p-4">
        <div>Are you sure you want to delete?</div>
        <div class="mt-1 flex gap-2">
          <button type="button" on:click={() => (showConfirm = false)}>
            Cancel
          </button>
          <input name="categoryID" type="hidden" value={categoryID} />
          <button on:click={() => {}} type="submit" class="primary">
            Yes,&nbsp;delete!
          </button>
        </div>
      </div>
    </div>
  </form>
{/if}

<button type="button" class="submit" on:click={() => (showConfirm = true)}>
  {label}
</button>
