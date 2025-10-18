<script>
	import { currentTheme } from '$lib/stores.svelte';
	import AddColor from '../components/AddColor.svelte';
	import ColorRow from '../components/ColorRow.svelte';
	import SectionHeader from '../components/SectionHeader.svelte';
</script>

<SectionHeader
	title="Color Contrasts"
	description="Create a theme or check combinations of colors based on their accessibility."
/>
<AddColor />

{#each currentTheme.colors as color, i (i)}
	<ColorRow {color} />
{/each}
