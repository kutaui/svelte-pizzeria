<script lang="ts">
  import { Toast } from "flowbite-svelte";

  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import type { ActionData } from "./$types";

  interface Props {
    data: {
      result: UserWithoutPassword;
      form: ActionData;
    };
  }

  let { data } = $props<Props>();
  let profile = data.result;
  let form = data.form;
</script>

<section class="mt-8">
  <UserTabs isAdmin={true} />
  <div class="mx-auto mt-8 max-w-2xl">
    <UserForm user={profile} />
  </div>
</section>
