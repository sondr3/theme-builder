<script lang="ts">
  import { hex, isValidColor } from "a11y-color-contrast";
  import { currentTheme } from "$lib/stores";
  import type { ThemeColor } from "$lib/helpers";

  let editingColor = false;
  const toggleColor = async () => {
    editingColor = !editingColor;
  };

  let editingName = false;
  const toggleName = async () => {
    editingName = !editingName;
  };

  let colorInput: HTMLInputElement;
  let nameInput: HTMLInputElement;

  export let color: ThemeColor;

  const colorClick = async () => {
    await toggleColor();
    colorInput.focus();
  };

  const nameClick = async () => {
    await toggleName();
    nameInput.focus();
  };

  const update = (col: ThemeColor) => {
    currentTheme.update((theme) => {
      let idx = theme.colors.findIndex((c) => c.name === color.name);
      theme.colors[idx] = col;
      color = col;
      return theme;
    });
  };

  const updateName = (event: any) => {
    const name = event.target.value;
    color.name = name.trim();
    update(color);
  };

  const updateColor = (event: any) => {
    const col = event.target.value.trim();
    if (isValidColor(hex(col))) {
      color.color = col;
      update(color);
    }
  };
</script>

<div class="px-4 py-5 sm:p-6 h-28">
  <dt class="text-base font-normal" on:click={nameClick}>
    {#if editingName}
      <input
        on:input={updateName}
        bind:this={nameInput}
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
        value={color.name}
        placeholder={color.name}
        on:blur={() => (editingName = false)}
        on:focus={() => (editingName = true)}
        type="text"
      />
    {:else}
      {color.name}
    {/if}
  </dt>
  <dd class="mt-1" on:click={colorClick}>
    {#if editingColor}
      <input
        on:input={updateColor}
        bind:this={colorInput}
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
        value={color.color}
        placeholder={color.color}
        on:blur={() => (editingColor = false)}
        on:focus={() => (editingColor = true)}
        type="text"
      />
    {:else}
      <div class="flex items-baseline text-2xl font-semibold">
        {color.color}
      </div>
    {/if}
  </dd>
</div>
