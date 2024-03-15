<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { User } from "$lib/types/User";

  interface Props {
    data: {
      user: User
    };
  }

  const { data } = $props<Props>();
  const { user } = data;
</script>

<section class="mt-8 mx-auto max-w-2xl">
  <UserTabs isAdmin={true} />
  <div class="mt-8">
    <UserForm user={user} edit />
  </div>
</section>
