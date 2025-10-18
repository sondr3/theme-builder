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

	let {
		color,
		variant,
		background
	}: { color: ThemeColor; variant: 'light' | 'dark'; background: string } = $props();

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
			if (variant === 'light') {
				color.light = col;
			} else {
				color.dark = col;
			}
			update(color);
		}
	};

	let currentColor = $derived(
		variant === 'light' ? (color.light ?? '#000000') : (color.dark ?? '#ffffff')
	);
</script>

<div
	class="flex h-full flex-col items-center justify-center px-4 py-5 sm:p-6"
	style:background-color={background}
>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<dt
		class="text-center text-base font-normal"
		onclick={nameClick}
		onkeypress={nameClick}
		style:color={currentColor}
	>
		{#if editingName}
			<input
				oninput={updateName}
				bind:this={nameInput}
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
	<dd
		class="mt-1 text-center"
		onclick={colorClick}
		onkeypress={nameClick}
		style:color={currentColor}
	>
		{#if editingColor}
			<input
				oninput={updateColor}
				bind:this={colorInput}
				class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
				value={currentColor}
				placeholder={currentColor}
				onblur={() => (editingColor = false)}
				onfocus={() => (editingColor = true)}
				type="text"
			/>
		{:else}
			<div class="text-2xl font-semibold">
				{currentColor}
			</div>
		{/if}
	</dd>
</div>
