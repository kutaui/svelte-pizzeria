<script lang="ts">
  import UserTabs from "$lib/components/UserTabs.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import type { Order } from "$lib/types/Order";

  interface Props {
    data: {
      user: UserWithoutPassword;
      orders: Order[];
    };
  }

  const { data } = $props<Props>();
  const { user, orders } = data;
</script>

<section class="mx-auto mt-8 max-w-2xl">
  <UserTabs isAdmin={user?.admin} />
  <div class="mt-8">
    {#if orders?.length > 0}
      {#each orders as order (order.id)}
        <div
          class="mb-2 flex flex-col items-center gap-6 rounded-lg bg-gray-100 p-4 md:flex-row"
        >
          <div class="flex grow flex-col items-center gap-6 md:flex-row">
            <div>
              <div
                class={(order.paid ? "bg-green-500" : "bg-red-400") +
                  " w-24 rounded-md p-2 text-center text-white"}
              >
                {order.paid ? "Paid" : "Not paid"}
              </div>
            </div>
            <div class="grow">
              <div class="mb-1 flex items-center gap-2">
                <div class="grow">{order.userEmail}</div>
                <div class="text-sm text-gray-500">{order.createdAt}</div>
              </div>
              <div class="text-xs text-gray-500">
                {order.cartProducts.map((p) => p.name).join(", ")}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end gap-2 whitespace-nowrap">
            <a href={"/orders/" + order.id} class="button"> Show order </a>
          </div>
        </div>
      {/each}
    {/if}
  </div>
</section>
