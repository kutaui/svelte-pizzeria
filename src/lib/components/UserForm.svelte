<script lang="ts">
  import EditableImage from "$lib/components/EditableImage.svelte";
  import type { Profile, UserWithoutPassword } from "$lib/types/User";
  import AddressInputs from "$lib/components/AddressInputs.svelte";
  import { enhance } from "$app/forms";
  import { page } from "$app/stores";

  interface Props {
    user: UserWithoutPassword;
    edit?: boolean;
  }

  let { user, edit } = $props<Props>();
  let {
    name,
    phone,
    streetAddress,
    postalCode,
    city,
    country,
    image,
  }: Profile = $state({
    name: user?.name || "",
    phone: user?.phone || "",
    streetAddress: user?.streetAddress || "",
    postalCode: user?.postalCode || "",
    city: user?.city || "",
    country: user?.country || "",
    image: user?.image || "",
  });
  $effect(() => console.log($page?.form));

  const action = edit ? `/users/${user?.id}?/edit` : "/profile?/profile";

</script>

{#if $page.form?.success}
  <div class="mt-4 text-center text-green-500">
    <p>work</p>
  </div>
{/if}
<div class="gap-4 md:flex">
  <div>
    <div class="relative max-w-[120px] rounded-lg p-2">
      <EditableImage link={image} />
    </div>
  </div>
  <form
    class="grow"
    method="POST"
    action={action}
    use:enhance={() => {
      return async ({ update }) => {
        update({ reset: false });
      };
    }}
  >
    >
    <label for="name"> First and last name </label>
    <input
      name="name"
      bind:value={name}
      type="text"
      placeholder="First and last name"
    />
    <label for="email">Email</label>
    <input
      name="email"
      type="email"
      disabled={true}
      placeholder={"email"}
      bind:value={user.email}
    />
    <AddressInputs
      addressProps={{ phone, streetAddress, postalCode, city, country }}
    />
    {#if user?.admin}
      <div>
        <label class="mb-2 inline-flex items-center gap-2 p-2" for="adminCb">
          <input id="adminCb" type="checkbox" class="" value={"1"} />
          <span>Admin</span>
        </label>
      </div>
    {/if}
    <button type="submit">Save</button>
  </form>
</div>
