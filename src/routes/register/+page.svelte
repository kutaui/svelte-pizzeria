<script lang="ts">
  import type { ActionData } from "./$types";
  import { enhance } from "$app/forms";
  import type { Load } from "@sveltejs/kit";
  import type { User, UserWithoutPassword } from "$lib/types/User";

  let { email, password } = $state({ email: "", password: "" });

  let {
    form,
    data,
  }: { form: ActionData; data: { user: UserWithoutPassword | undefined } } =
    $props();
  console.log(data.user);
</script>

<section class="mt-8">
  <h1 class="mb-4 text-center text-4xl text-primary">Register</h1>
  <form
    class="mx-auto block max-w-xs"
    method="POST"
    action="?/register"
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
    <button type="submit">Register</button>
    <div class="my-4 border-t pt-4 text-center text-gray-500">
      Existing account?
      <a class="underline" href={"/login"}>Login here &raquo;</a>
    </div>
  </form>
</section>
