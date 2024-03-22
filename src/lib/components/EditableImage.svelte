<script lang="ts">

  interface Props {
    link: string | null;
    product?: boolean;
    userId?: number;
    form?: any;
  }

  let { link, product, userId, form } = $props<Props>();
  const imageAction = product ? `/menu-items/new?/image` : "/profile?/image";


  const handleFileSelect = (event: Event) => {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      form.requestSubmit();
    }

  };


</script>

{#if link}
  <img
    class="mb-1 h-full w-full rounded-lg"
    src={link}
    width={250}
    height={250}
    alt={"avatar"}
  />
{/if}
{#if !link}
  <div class="mb-1 rounded-lg bg-gray-200 p-4 text-center text-gray-500">
    No image
  </div>
{/if}

<form
  method="post"
  action={imageAction}
  bind:this={form}
  enctype="multipart/form-data"
>
  <label>
    <input name="image" type="file" class="hidden"
           on:change={handleFileSelect}
    />
    <input name="userId" type="hidden" value={userId} />
    <span
      class="block cursor-pointer rounded-lg border border-gray-300 p-2 text-center">Change image</span>
  </label>
</form>

