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

<section class="max-w-2xl mx-auto mt-8">
  <UserTabs isAdmin={true} />
  <div class="mt-8">
    {#if users?.length > 0}
      {#each users as user (user.id)}
        <div
          class="bg-gray-100 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
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
            <a class="button" href={'/users/' + user.id}>
              Edit
            </a>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
