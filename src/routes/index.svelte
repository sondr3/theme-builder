<script lang="ts">
  import { colors } from "$lib/stores";
  import ColorRow from "$components/ColorRow.svelte";
  import AddColor from "$components/AddColor.svelte";
</script>

<div class="pb-5 border-b border-gray-200">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Color Contrasts</h3>
  <p class="mt-2 max-w-4xl text-sm text-gray-500">
    Create a theme or check combinations of colors based on their accessibility.
  </p>
</div>

<AddColor />

{#each $colors as color, i (i)}
  <ColorRow {color} />
{/each}
