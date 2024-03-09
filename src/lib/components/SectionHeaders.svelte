<script lang="ts">
  interface Props {
    subHeader?: string;
    mainHeader: string;
	
  }

  let { subHeader, mainHeader } = $props<Props>();
</script>

<div style="display: contents">
  <h3 class="font-semibold uppercase leading-4 text-gray-500">
    {subHeader}
  </h3>
  <h2 class="text-4xl font-bold italic text-primary">
    {mainHeader}
  </h2>
</div>
