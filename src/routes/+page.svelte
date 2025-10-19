<script>
	import { currentTheme } from '$lib/stores.svelte';
	import AddColor from '../components/AddColor.svelte';
	import ColorRow from '../components/ColorRow.svelte';
	import SectionHeader from '../components/SectionHeader.svelte';
</script>

<svelte:head>
	<title>Theme Builder | YEET</title>
</svelte:head>
<SectionHeader
	title="Color Contrasts"
	description="Create a theme or check combinations of colors based on their accessibility."
/>
<AddColor />

{#each currentTheme.colors as color, i (i)}
	<ColorRow {color} />
{/each}

<footer class="mt-16 border-t border-gray-200 bg-gray-50 py-12">
	<div class="text-center text-sm text-gray-600">
		<p>Theme Builder for WCAG 2.2 and WCAG 3.0 (APCA) Accessibility</p>
	</div>
</footer>
