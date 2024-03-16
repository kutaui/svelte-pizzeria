<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";

  interface Props {
    data: {
      result: UserWithoutPassword;
      user: UserWithoutPassword;
    };
  }

  let { data } = $props<Props>();
  let { user } = data;
  let profile = user;
</script>

<section class="mt-8">
  <UserTabs isAdmin={user.admin} />
  <div class="mx-auto mt-8 max-w-2xl">
    <UserForm user={profile} />
  </div>
</section>
