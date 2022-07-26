<script lang="ts">
  import { background } from "$lib/stores";
  import { toHex, type Color } from "a11y-color-contrast";
  import ColorRow from "$components/ColorRow.svelte";

  let backgroundColor: Color;
  background.subscribe((c) => {
    backgroundColor = c;
  });
</script>

<h1>COLORS</h1>
<p>Background: {toHex(backgroundColor)}</p>

<ColorRow />
