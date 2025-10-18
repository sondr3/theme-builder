<script lang="ts">
	import { page } from '$app/stores';

	let { href, name }: { href: string; name: string } = $props();

	let current = $derived(href === $page.url.pathname);
</script>

<div class="-my-px ml-6 flex space-x-8">
	<a
		{href}
		class={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
			current
				? 'border-indigo-500 text-gray-900'
				: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
		}`}
	>
		{name}
	</a>
</div>
