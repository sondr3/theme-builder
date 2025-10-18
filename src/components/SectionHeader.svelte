<script lang="ts">
	let { title, description }: { title: string; description: string } = $props();
</script>

<div class="border-b border-gray-200 pb-5">
	<h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
	<p class="mt-2 max-w-4xl text-sm text-gray-500">
		{description}
	</p>
</div>
