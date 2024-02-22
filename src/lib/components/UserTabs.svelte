<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  interface Props {
    isAdmin: boolean | undefined;
  }

  let path = $state();
  onMount(() => {
    path = window.location.pathname;
  });
  let { isAdmin } = $props<Props>();
</script>

<div class="tabs mx-auto flex flex-wrap justify-center gap-2">
  <a class={path === "/profile" ? "active" : ""} href={"/profile"}> Profile </a>
  {#if isAdmin}
    <a href={"/categories"} class={path === "/categories" ? "active" : ""}>
      Categories
    </a>
    <a href={"/menu-items"} class={path.includes("menu-items") ? "active" : ""}>
      Menu Items
    </a>
    <a class={path.includes("/users") ? "active" : ""} href={"/users"}>
      Users
    </a>
  {/if}
  <a class={path === "/orders" ? "active" : ""} href={"/orders"}> Orders </a>
</div>
