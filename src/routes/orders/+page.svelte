<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import type { Order } from "$lib/types/Order";

  interface Props {
    data: {
      user: UserWithoutPassword
      orders: Order[]
    };
  }

  const { data } = $props<Props>();
  const { user, orders } = data;
</script>

<section class="mt-8 max-w-2xl mx-auto">
  <UserTabs isAdmin={user?.admin} />
  <div class="mt-8">
    {#if orders?.length > 0}
      {#each orders as order (order.id)}
        <div
          class="bg-gray-100 mb-2 p-4 rounded-lg flex flex-col md:flex-row items-center gap-6">
          <div class="grow flex flex-col md:flex-row items-center gap-6">
            <div>
              <div class={
              (order.paid ? 'bg-green-500' : 'bg-red-400')
              + ' p-2 rounded-md text-white w-24 text-center'
            }>
                {order.paid ? 'Paid' : 'Not paid'}
              </div>
            </div>
            <div class="grow">
              <div class="flex gap-2 items-center mb-1">
                <div class="grow">{order.userEmail}</div>
                <div class="text-gray-500 text-sm">{order.createdAt}</div>
              </div>
              <div class="text-gray-500 text-xs">
                {order.cartProducts.map(p => p.name).join(', ')}
              </div>
            </div>
          </div>
          <div class="justify-end flex gap-2 items-center whitespace-nowrap">
            <a href={"/orders/" + order.id} class="button">
              Show order
            </a>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
