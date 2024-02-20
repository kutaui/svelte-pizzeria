<script lang="ts">
  let { user } = $props();
  console.log(user);
</script>

<header class="flex items-center justify-between">
  <nav class="flex items-center gap-8 font-semibold text-gray-600">
    <a href="/" class="text-2xl font-black text-primary">PIZZERIA</a>
    <a href="/">Home</a>
    <a href="/">Menu</a>
    <a href="/">About</a>
    <a href="/">Contact</a>
  </nav>
  <nav class="flex items-center gap-4 font-semibold text-gray-600">
    {#if !user}
      <a href="/login" class="rounded-full bg-primary px-8 py-2 text-white"
        >Login</a
      >
      <a href="/register" class="rounded-full bg-primary px-8 py-2 text-white"
        >Register</a
      >
    {:else if user}
      <a href="/profile" class="rounded-full bg-primary px-8 py-2 text-white"
        >Profile</a
      >
      <a href="/logout" class="rounded-full bg-primary px-8 py-2 text-white"
        >Logout</a
      >
    {/if}
  </nav>
</header>
