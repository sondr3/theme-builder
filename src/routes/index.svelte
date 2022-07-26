<script lang="ts">
  import { background } from "$lib/stores";
  import { toHex, type Color } from "a11y-color-contrast";
  import ColorRow from "$components/ColorRow.svelte";

  let backgroundColor: Color;
  background.subscribe((c) => {
    backgroundColor = c;
  });

  let colors: unknown[] = [];
  const addColor = () => {
    colors = [...colors, ColorRow];
  };
</script>

<h1>COLORS</h1>
<p>Background: {toHex(backgroundColor)}</p>
<button on:click={addColor}>Add color</button>

{#each colors as color, i (i)}
  <svelte:component this={color} />
{/each}
