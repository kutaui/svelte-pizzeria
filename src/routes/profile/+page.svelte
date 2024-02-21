<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import type { Profile } from "$lib/types/Profile";

  interface Props {
    data: { user: UserWithoutPassword | undefined };
    profile: Profile;
  }

  let { data, profile } = $props<Props>();
  let user = data.user;
</script>

<section class="mt-8">
  <UserTabs isAdmin={profile.admin} />
  <div class="mx-auto mt-8 max-w-2xl">
    <UserForm {user} {profile} />
  </div>
</section>
