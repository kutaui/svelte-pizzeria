<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { User } from "$lib/types/User";

  interface Props {
    data: {
      user: User;
      currentUser: User;
    };
  }

  const { data } = $props<Props>();
  const { user, currentUser } = data;
</script>

<section class="mx-auto mt-8 max-w-2xl">
  <UserTabs isAdmin={currentUser.admin} />
  <div class="mt-8">
    <UserForm {user} edit {currentUser} />
  </div>
</section>
