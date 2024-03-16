<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import type { UserWithoutPassword } from "$lib/types/User";

  let { email, password } = $state({ email: "", password: "" });

  let {
    form,
    data,
  }: { form: ActionData; data: { user: UserWithoutPassword | undefined } } =
    $props();
</script>

<section class="mt-8">
  <h1 class="mb-4 text-center text-4xl text-primary">Login</h1>
  <form
    class="mx-auto block max-w-xs"
    method="POST"
    action="?/login"
    use:enhance
  >
    <input name="email" type="email" placeholder="email" bind:value={email} />
    <input
      name="password"
      type="password"
      placeholder="password"
      bind:value={password}
    />
    {#if form?.error}<p class="text-red-600">
        {form.error}
      </p>{/if}
    <button type="submit">Login</button>
    <div class="my-4 border-t pt-4 text-center text-gray-500">
      Don't have an account?
      <a class="underline" href={"/register"}>Register here &raquo;</a>
    </div>
  </form>
</section>
