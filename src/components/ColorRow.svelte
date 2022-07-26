<script lang="ts">
  import {
    apcaContrastValue,
    hex,
    isValidColor,
    round,
    wcagContrastValue,
  } from "a11y-color-contrast";
  import { background, colors } from "$lib/stores";

  let editing = false;
  const toggle = async () => {
    editing = !editing;
  };

  let inputElem: HTMLInputElement;

  export let color: string;

  const onClick = async () => {
    await toggle();
    inputElem.focus();
  };

  const updateColor = (event: any) => {
    const col = event.target.value;
    if (isValidColor(hex(col))) {
      colors.update((old) => {
        let idx = old.findIndex((c) => c === color);
        old[idx] = col;
        return old;
      });
    }
  };

  $: calc = hex(color);
  $: wcag = round(wcagContrastValue(calc, hex($background)));
  $: apca = round(Math.abs(apcaContrastValue(calc, hex($background))));
  // $: invalid = Number.isNaN(wcag) || Number.isNaN(apca);
</script>

<div>
  <dl class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={$background}
      style:color
      on:click={onClick}
    >
      <dt class="text-sm font-medium truncate">Color</dt>
      {#if editing}
        <input
          on:input={updateColor}
          bind:this={inputElem}
          class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
          value={color}
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
      style:background-color={$background}
      style:color
    >
      <dt class="text-sm font-medium truncate">WCAG 2.0</dt>
      <dd class="mt-1 text-3xl font-semibold">{wcag}</dd>
    </div>

    <div
      class="px-4 py-5 shadow rounded-lg overflow-hidden sm:p-6"
      style:background-color={$background}
      style:color
    >
      <dt class="text-sm font-medium truncate">WCAG 3.0</dt>
      <dd class="mt-1 text-3xl font-semibold">{apca}</dd>
    </div>
  </dl>
</div>
