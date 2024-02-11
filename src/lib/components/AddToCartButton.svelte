<script lang="ts">
	type Props = {
		basePrice: string;
		onClick: () => void;
	};
	
	let { basePrice, onClick } = $props<Props>();
</script>

<button type="button" class="mt-4 rounded-full bg-primary px-8 py-2 text-white" on:click={onClick}>
	<span>Add to cart (from {basePrice})</span></button
>
