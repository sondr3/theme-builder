<script lang="ts">
  import { apcaContrastValue, hex, round, toHex, wcagContrastValue } from "a11y-color-contrast";
  import { background } from "$lib/stores";

  let color = hex("#f5f5f5");
  let wcag = round(wcagContrastValue(color, $background));
  let apca = round(Math.abs(apcaContrastValue(color, $background)));
</script>

<div>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={toHex($background)}
      style:color={toHex(color)}
    >
      <dt class="text-sm font-medium truncate">Color</dt>
      <dd class="mt-1 text-3xl font-semibold">{toHex(color)}</dd>
    </div>

    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={toHex($background)}
      style:color={toHex(color)}
    >
      <dt class="text-sm font-medium truncate">WCAG 2.0</dt>
      <dd class="mt-1 text-3xl font-semibold">{wcag}</dd>
    </div>

    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={toHex($background)}
      style:color={toHex(color)}
    >
      <dt class="text-sm font-medium truncate">WCAG 3.0</dt>
      <dd class="mt-1 text-3xl font-semibold">{apca}</dd>
    </div>
  </dl>
</div>
