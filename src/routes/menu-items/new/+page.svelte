<script>
  import UserTabs from "$lib/components/UserTabs.svelte";
  import MenuItemForm from "$lib/components/MenuItemForm.svelte";
</script>

<section class="mt-8">
  <UserTabs isAdmin={true} />
  <div class="mx-auto mt-8 max-w-2xl">
    <a href={"/menu-items"} class="button">
      <img src="left-arrow-black.svg" alt="" class="h-6 w-6" />
      <span>Show all menu items</span>
    </a>
  </div>
  <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
</section>
