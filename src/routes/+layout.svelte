<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
</script>

<Header />
<slot />
<footer class="mt-16 border-t p-8 text-center text-gray-500">
	&copy; 2024 All rights reserved
</footer>
