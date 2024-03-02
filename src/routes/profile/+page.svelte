<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";

  interface Props {
    data: {
      result: UserWithoutPassword;
    };
  }

  let { data } = $props<Props>();
  let profile = data.result;

</script>

<section class="mt-8">
  <UserTabs isAdmin={true} />
  <div class="mx-auto mt-8 max-w-2xl">
    <UserForm user={profile} />
  </div>
</section>
