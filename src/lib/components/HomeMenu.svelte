<script>
	import SectionHeaders from '$lib/components/SectionHeaders.svelte';
	import MenuItem from '$lib/components/MenuItem.svelte';
</script>

<section class="">
	<div class="absolute left-0 right-0 w-full justify-start">
		<div class="absolute -top-[70px] left-0 -z-10 text-left">
			<img src={'sallad1.png'} class="h-[189px] w-[109px]" alt="Salad" />
		</div>
		<div class="absolute -top-[100px] right-0 -z-10">
			<img src={'sallad2.png'} class="h-[195px] w-[107px]" alt="Salad" />
		</div>
	</div>
	<div class="mb-4 text-center">
		<SectionHeaders subHeader="check out" mainHeader="Our Best Sellers" />
	</div>
	<div class="grid gap-4 sm:grid-cols-3">
		<MenuItem />
		<MenuItem />
		<MenuItem />
		<MenuItem />
		<MenuItem />
		<MenuItem />
	</div>
</section>
