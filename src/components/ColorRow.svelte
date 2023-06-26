<script lang="ts">
  import { currentTheme } from "$lib/stores";
  import { calcApca, calcWcag, type ThemeColor } from "$lib/helpers";
  import ValidColorIcon from "./ValidColorIcon.svelte";
  import EditableRow from "./EditableRow.svelte";

  export let color: ThemeColor;

  const removeColor = () => {
    currentTheme.update((theme) => {
      let idx = theme.colors.findIndex((c) => c.name === color.name);
      theme.colors = theme.colors.filter((_, i) => i !== idx);
      return theme;
    });
  };

  $: wcag = calcWcag(color.color, $currentTheme.background);
  $: apca = calcApca(color.color, $currentTheme.background);
  $: validWcag = !Number.isNaN(wcag) && wcag >= 7.5;
  $: validApca = !Number.isNaN(apca) && apca >= 70;
</script>

<div>
  <dl
    class="mt-5 grid grid-cols-color-row rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:divide-y-0 md:divide-x"
    style:background-color={$currentTheme.background}
    style:color={color.color}
  >
    <EditableRow {color} />

    <div class="px-4 py-5 sm:p-6 flex justify-between">
      <div>
        <dt class="text-base font-normal">WCAG 2.2</dt>
        <dd class="mt-1 md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold">{wcag}</div>
        </dd>
      </div>

      <ValidColorIcon valid={validWcag} color={color.color} />
    </div>

    <div class="px-4 py-5 sm:p-6 flex justify-between">
      <div>
        <dt class="text-base font-normal">WCAG 3.0</dt>
        <dd class="mt-1 md:block lg:flex">
          <div class="flex items-baseline text-2xl font-semibold">{apca}</div>
        </dd>
      </div>

      <ValidColorIcon valid={validApca} color={color.color} />
    </div>
    <div class="px-1 py-1 flex justify-center">
      <button
        on:click={removeColor}
        class="inline-flex items-center justify-center p-2 text-gray-800 focus:outline-none float-right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>
  </dl>
</div>
