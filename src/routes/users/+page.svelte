<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import type { User } from "$lib/types/User";

  interface Props {
    data: {
      users: User[];
    };
  }

  const { data } = $props<Props>();
  const { users } = data;
</script>

<section class="mx-auto mt-8 max-w-2xl">
  <UserTabs isAdmin={true} />
  <div class="mt-8">
    {#if users?.length > 0}
      {#each users as user (user.id)}
        <div
          class="mb-2 flex items-center gap-4 rounded-lg bg-gray-100 p-1 px-4"
        >
          <div class="grid grow grid-cols-2 gap-4 md:grid-cols-3">
            <div class="text-gray-900">
              {#if user.name}
                <span>{user.name}</span>
              {:else}
                <span class="italic">No name</span>
              {/if}
            </div>
            <span class="text-gray-500">{user.email}</span>
          </div>
          <div>
            <a class="button" href={"/users/" + user.id}> Edit </a>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
