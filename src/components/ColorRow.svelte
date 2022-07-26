<script lang="ts">
  import { apcaContrastValue, hex, round, toHex, wcagContrastValue } from "a11y-color-contrast";
  import { background } from "$lib/stores";

  let editing = false;
  const toggle = async () => {
    editing = !editing;
  };

  let inputElem: HTMLInputElement;

  const onClick = async () => {
    await toggle();
    inputElem.focus();
  };

  let color = "#f5f5f5";
  let calc = hex(color);
  let wcag = round(wcagContrastValue(calc, $background));
  let apca = round(Math.abs(apcaContrastValue(calc, $background)));
</script>

<div>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      on:click={onClick}
      style:background-color={toHex($background)}
      style:color
    >
      <dt class="text-sm font-medium truncate">Color</dt>
      {#if editing}
        <input
          bind:this={inputElem}
          class="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
          bind:value={color}
          placeholder={color}
          on:blur={() => (editing = false)}
          on:focus={() => (editing = true)}
          type="text"
        />
      {:else}
        <dd class="mt-1 text-3xl font-semibold">{color}</dd>
      {/if}
    </div>

    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={toHex($background)}
      style:color
    >
      <dt class="text-sm font-medium truncate">WCAG 2.0</dt>
      <dd class="mt-1 text-3xl font-semibold">{wcag}</dd>
    </div>

    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={toHex($background)}
      style:color
    >
      <dt class="text-sm font-medium truncate">WCAG 3.0</dt>
      <dd class="mt-1 text-3xl font-semibold">{apca}</dd>
    </div>
  </dl>
</div>
