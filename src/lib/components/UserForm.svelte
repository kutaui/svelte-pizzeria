<script lang="ts">
  import EditableImage from "$lib/components/EditableImage.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import type { Profile } from "$lib/types/Profile";

  interface Props {
    user: UserWithoutPassword | undefined;
    profile: Profile;
  }

  let { user, profile } = $props<Props>();
  let {
    phone,
    streetAddress,
    postalCode,
    city,
    country,
    image,
    admin,
  }: Profile = $state({
    phone: profile?.phone || "",
    streetAddress: profile?.streetAddress || "",
    postalCode: profile?.postalCode || "",
    city: profile?.city || "",
    country: profile?.country || "",
    image: profile?.image || "",
    admin: profile?.admin || false,
  });
</script>

<div class="gap-4 md:flex">
  <div>
    <div class="relative max-w-[120px] rounded-lg p-2">
      <EditableImage link={image} />
    </div>
  </div>
  <form class="grow">
    <label> First and last name </label>
    <input type="text" placeholder="First and last name" />
    <label>Email</label>
    <input type="email" disabled={true} placeholder={"email"} />
    <AddressInputs
      addressProps={{ phone, streetAddress, postalCode, city, country }}
      setAddressProp={handleAddressChange}
    />
    {#if profile.admin}
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
