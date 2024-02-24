<script lang="ts">
  import { onMount } from "svelte";

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
  <UserTabs isAdmin={profile.admin} />
  <div class="mx-auto mt-8 max-w-2xl">
    <UserForm user={profile} />
  </div>
  {#if form?.success}
    <div class="mt-4 text-center text-green-500">
      <p>work</p>
    </div>
  {/if}
</section>
