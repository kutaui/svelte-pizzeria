<script lang="ts">
  interface Props {
    link: string | null;
    edit?: boolean;
    userId?: number;
  }

  let { link, edit, userId } = $props<Props>();
  const imageAction = edit ? `/users/${userId}/image?/edit` : "/profile?/image";

  const uploadImage = async (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async () => {
      const base64String = reader.result.toString().split(",")[1];

      const formData = new FormData();
      formData.append("image", base64String);
      if (userId) {
        formData.append("userId", userId.toString()); // Append userId to form data
      }

      try {
        const response = await fetch(imageAction, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("Image uploaded successfully");
          link = base64String;
        } else {
          console.log("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    reader.readAsDataURL(file);
  };
  
</script>

{#if link}
  <img
    class="mb-1 h-full w-full rounded-lg"
    src={`data:image/jpeg;base64,${link}`}
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
>
  <label>
    <input name="image" type="file" class="hidden" on:change={uploadImage} />
    <span
      class="block cursor-pointer rounded-lg border border-gray-300 p-2 text-center">Change image</span>
  </label>
</form>

