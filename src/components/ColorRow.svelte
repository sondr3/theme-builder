<script lang="ts">
  import { hex, isValidColor } from "a11y-color-contrast";
  import { background, colors } from "$lib/stores";
  import { calcApca, calcWcag } from "$lib/helpers";
  import ValidColorIcon from "./ValidColorIcon.svelte";

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
      colors.update((cols) => {
        let idx = cols.findIndex((c) => c === color);
        cols[idx] = col;
        color = col;
        return cols;
      });
    }
  };

  const removeColor = () => {
    colors.update((cols) => {
      let idx = cols.findIndex((c) => c === color);
      return cols.filter((_, i) => i !== idx);
    });
  };

  $: wcag = calcWcag(color, $background);
  $: apca = calcApca(color, $background);
  $: validWcag = !Number.isNaN(wcag) && wcag >= 7.5;
  $: validApca = !Number.isNaN(apca) && apca >= 70;
  // $: invalid = Number.isNaN(wcag) || Number.isNaN(apca);
</script>

<div>
  <button
    on:click={removeColor}
    class="inline-flex items-center p-2 text-white focus:outline-none float-right absolute right-48"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        fill-rule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clip-rule="evenodd"
      />
    </svg>
  </button>
  <dl
    class="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x"
    style:background-color={$background}
    style:color
  >
    <div class="px-4 py-5 sm:p-6" on:click={onClick}>
      <dt class="text-base font-normal">Color</dt>
      <dd class="mt-1 flex justify-between items-baseline md:block lg:flex">
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
          <div class="flex items-baseline text-2xl font-semibold">
            {color}
          </div>
        {/if}
      </dd>
    </div>

    <div class="px-4 py-5 sm:p-6 flex justify-between">
      <div>
        <dt class="text-base font-normal">WCAG 2.2</dt>
        <dd class="mt-1 md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold">{wcag}</div>
        </dd>
      </div>

      <ValidColorIcon valid={validWcag} {color} />
    </div>

    <div class="px-4 py-5 sm:p-6 flex justify-between">
      <div>
        <dt class="text-base font-normal">WCAG 3.0</dt>
        <dd class="mt-1 md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold">{apca}</div>
        </dd>
      </div>

      <ValidColorIcon valid={validApca} {color} />
    </div>
  </dl>
</div>
