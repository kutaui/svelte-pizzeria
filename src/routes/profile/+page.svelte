<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import UserForm from "$lib/components/UserForm.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import { page } from "$app/stores";
  import type { ActionData } from "./$types";
  import toast from "svelte-french-toast";

  interface Props {
    data: {
      result: UserWithoutPassword;
      user: UserWithoutPassword;
    };
    form: ActionData;
  }

  let { data, form } = $props<Props>();
  let { user } = data;
  let profile = user;

  $effect(() => {
    if (form?.error) toast.error(form?.error);
    if (form?.success) toast.success("Profile updated successfully");
  });
</script>

<section class="mt-8">
  <UserTabs isAdmin={user.admin} />
  <div class="mx-auto mt-8 max-w-2xl">
    <UserForm user={profile} {form} />
  </div>
</section>
