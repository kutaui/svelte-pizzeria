<script lang="ts">
  import "../app.css";
  import Header from "$lib/components/Header.svelte";
  import type { UserWithoutPassword } from "$lib/types/User";
  import { Toaster } from "svelte-french-toast";
  import Honeybadger from "@honeybadger-io/js";

  Honeybadger.configure({
    apiKey: "hbp_14F9s0jLA82d6AjF8fA7FPrtLjsFcB0oiHdV",
    environment: "production",
  });

  type Props = {
    data: { user: UserWithoutPassword | undefined };
  };

  let { data } = $props<Props>();
</script>

<Toaster />
<Header user={data.user} />
<slot />
<footer class="mt-16 border-t p-8 text-center text-gray-500">
  &copy; 2024 All rights reserved
</footer>
