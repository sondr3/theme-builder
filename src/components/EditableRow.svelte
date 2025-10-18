<script lang="ts">
	import { hex, isValidColor } from 'a11y-color-contrast';
	import { currentTheme } from '$lib/stores.svelte';
	import type { ThemeColor } from '$lib/helpers';

	let editingColor = $state(false);
	const toggleColor = async () => {
		editingColor = !editingColor;
	};

	let editingName = $state(false);
	const toggleName = async () => {
		editingName = !editingName;
	};

	let colorInput: HTMLInputElement;
	let nameInput: HTMLInputElement;

	let { color }: { color: ThemeColor } = $props();

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
			let idx = theme.colors.findIndex((c) => c.color === color.color);
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

<div class="h-28 px-4 py-5 sm:p-6">
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<dt class="text-base font-normal" onclick={nameClick} onkeypress={nameClick}>
		{#if editingName}
			<input
				oninput={updateName}
				bind:this={nameInput}
				class="block w-full rounded-md border-gray-300 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				value={color.name}
				placeholder={color.name}
				onblur={() => (editingName = false)}
				onfocus={() => (editingName = true)}
				type="text"
			/>
		{:else}
			{color.name}
		{/if}
	</dt>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<dd class="mt-1" onclick={colorClick} onkeypress={nameClick}>
		{#if editingColor}
			<input
				oninput={updateColor}
				bind:this={colorInput}
				class="block w-full rounded-md border-gray-300 text-gray-800 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				value={color.color}
				placeholder={color.color}
				onblur={() => (editingColor = false)}
				onfocus={() => (editingColor = true)}
				type="text"
			/>
		{:else}
			<div class="flex items-baseline text-2xl font-semibold">
				{color.color}
			</div>
		{/if}
	</dd>
</div>
