<script lang="ts">
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

  const updateBackground = (event: any) => ($background = event.target.value);
</script>

<span class="sm:block" on:click={onClick}>
  {#if editing}
    <input
      bind:value={$background}
      bind:this={inputElem}
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md text-gray-800"
      on:input={updateBackground}
      on:blur={() => (editing = false)}
      on:focus={() => (editing = true)}
      type="text"
    />
  {:else}
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <svg
        class="-ml-1 mr-2 h-5 w-5 text-gray-500"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
        />
      </svg>
      Edit background
    </button>
  {/if}
</span>
