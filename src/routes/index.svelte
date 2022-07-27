<script lang="ts">
  import { colors, background } from "$lib/stores";
  import ColorRow from "$components/ColorRow.svelte";
  import { hex, isValidColor, toHex } from "a11y-color-contrast";
  import { calcApca, calcWcag } from "$lib/helpers";

  let colorToAdd = "#ffffff";
  let calculatedColor = colorToAdd;
  let validColor = true;

  let newColorWcag = calcWcag(calculatedColor, $background);
  let newColorApca = calcApca(calculatedColor, $background);

  $: validBackground = isValidColor(hex($background));

  const updateColor = (event: any) => {
    const value = hex(event.target.value);
    if (isValidColor(value)) {
      validColor = true;
      calculatedColor = toHex(value);
      newColorWcag = calcWcag(calculatedColor, $background);
      newColorApca = calcApca(calculatedColor, $background);
    } else {
      validColor = false;
    }
  };

  const addColor = () => {
    colors.update((old) => [...old, calculatedColor]);
    colorToAdd = "#ffffff";
    calculatedColor = colorToAdd;
  };
</script>

<div class="pb-5 border-b border-gray-200">
  <h3 class="text-lg leading-6 font-medium text-gray-900">Color Contrasts</h3>
  <p class="mt-2 max-w-4xl text-sm text-gray-500">
    Create a theme or check combinations of colors based on their accessibility.
  </p>
</div>

<div class="lg:flex lg:items-start lg:justify-between mt-6 h-36">
  <div class="flex">
    <div
      class="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label
        for="name"
        class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >Foreground</label
      >
      <input
        on:input={updateColor}
        value={colorToAdd}
        type="text"
        name="name"
        id="name"
        class="block w-40 h-full border-0 p-0 text-xl text-gray-900 placeholder-gray-500 focus:ring-0"
        placeholder="#ffffff"
      />
      {#if !validColor}
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            class="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      {/if}
    </div>
    <div
      class="border ml-2 border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <input
        class="block w-14 border-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm h-14 cursor-pointer"
        type="color"
        bind:value={calculatedColor}
      />
    </div>
  </div>

  <div class="w-full flex flex-col mx-2">
    <div class="flex justify-around">
      <div>
        <dt class="text-base font-normal">WCAG 2.2</dt>
        <dd class="mt-1 md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold">{newColorWcag}</div>
        </dd>
      </div>
      <div
        class="text-3xl px-4 py-2 rounded shadow"
        style:background={$background}
        style:color={calculatedColor}
      >
        <h3>Sample text</h3>
      </div>
      <div>
        <dt class="text-base font-normal">WCAG 3.0</dt>
        <dd class="mt-1 md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold">{newColorApca}</div>
        </dd>
      </div>
    </div>

    <span class="sm:ml-3 self-center mt-2">
      <button
        on:click={addColor}
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          class="-ml-1 mr-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        Add color
      </button>
    </span>
  </div>

  <div class="flex">
    <div
      class="border mr-2 border-gray-300 rounded-md shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <input
        class="block w-14 border-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm h-14 cursor-pointer"
        type="color"
        bind:value={$background}
      />
    </div>
    <div
      class="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600"
    >
      <label
        for="name"
        class="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >Background</label
      >
      <input
        type="text"
        name="name"
        id="name"
        class="block w-40 h-full border-0 p-0 text-xl text-gray-900 placeholder-gray-500 focus:ring-0"
        placeholder="#000000"
        bind:value={$background}
      />
      {#if !validBackground}
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            class="h-5 w-5 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      {/if}
    </div>
  </div>
</div>

{#each $colors as color, i (i)}
  <ColorRow {color} />
{:else}
  <button
    type="button"
    on:click={addColor}
    class="mt-2 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mx-auto h-12 w-12 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <span class="mt-2 block text-sm font-medium text-gray-900"> Add a color </span>
  </button>
{/each}
