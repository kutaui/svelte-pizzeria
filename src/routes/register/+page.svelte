<script lang="ts">
  let { email, password } = $state({ email: "", password: "" });
</script>

<section class="mt-8">
  <h1 class="mb-4 text-center text-4xl text-primary">Register</h1>
  <form class="mx-auto block max-w-xs">
    <input type="email" placeholder="email" value={email} />
    <input type="password" placeholder="password" value={password} />
    <button type="submit">Register</button>
    <div class="my-4 border-t pt-4 text-center text-gray-500">
      Existing account?{" "}
      <a class="underline" href={"/login"}>Login here &raquo;</a>
    </div>
  </form>
</section>
