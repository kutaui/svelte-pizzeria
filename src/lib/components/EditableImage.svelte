<script lang="ts">
  interface Props {
    link: string | undefined;
  }

  let { link } = $props<Props>();

  async function handleFileChange(ev: Event) {
    const files = (ev.target as HTMLInputElement).files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((newLink) => {
            link = newLink;
          });
        }
        throw new Error("Something went wrong");
      });
    }
  }
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
  <label>
    <input type="file" class="hidden" onChange={handleFileChange} />
    <span
      class="block cursor-pointer rounded-lg border border-gray-300 p-2 text-center"
      >Change image</span
    >
  </label>
{/if}
