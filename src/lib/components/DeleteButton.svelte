<script lang="ts">
  interface Props {
    label: string;
    onDelete: () => void;
  }

  let { label, onDelete } = $props<Props>();
  let showConfirm = $state(false);
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
        <button
          on:click={() => {
            onDelete();
            showConfirm = false;
          }}
          type="button"
          class="primary"
        >
          Yes,&nbsp;delete!
        </button>
      </div>
    </div>
  </div>
{/if}

{#if !showConfirm}
  <button type="button" on:click={() => (showConfirm = false)}>
    {label}
  </button>
{/if}
