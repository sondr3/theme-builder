<script lang="ts">
	import { currentTheme } from '$lib/stores.svelte';
	import { hex, isValidColor, toHex } from 'a11y-color-contrast';
	import { calcApca, calcWcag } from '$lib/helpers';
	import Color from 'colorjs.io';
	import type { Action } from 'svelte/action';

	let colorName = $state('Color');
	let lightColorInput = $state('#000000');
	let lightColorCalculated = $state('#000000');
	let darkColorInput = $state('#ffffff');
	let darkColorCalculated = $state('#ffffff');
	let validLightColor = $state(true);
	let validDarkColor = $state(true);

	let validLightBackground = $derived(
		currentTheme.lightBackground ? isValidColor(hex(currentTheme.lightBackground)) : false
	);
	let validDarkBackground = $derived(
		currentTheme.darkBackground ? isValidColor(hex(currentTheme.darkBackground)) : false
	);

	// Light variant contrast calculations
	let lightWcag = $derived(
		currentTheme.lightBackground ? calcWcag(lightColorCalculated, currentTheme.lightBackground) : 0
	);
	let lightApca = $derived(
		currentTheme.lightBackground ? calcApca(lightColorCalculated, currentTheme.lightBackground) : 0
	);

	// Dark variant contrast calculations
	let darkWcag = $derived(
		currentTheme.darkBackground ? calcWcag(darkColorCalculated, currentTheme.darkBackground) : 0
	);
	let darkApca = $derived(
		currentTheme.darkBackground ? calcApca(darkColorCalculated, currentTheme.darkBackground) : 0
	);

	const updateLightColor = (event: any) => {
		const input = event?.target?.value;
		if (!input) {
			validLightColor = false;
			return;
		}
		const value = hex(input);
		if (isValidColor(value)) {
			validLightColor = true;
			lightColorCalculated = toHex(value);
		} else {
			validLightColor = false;
		}
	};

	const updateDarkColor = (event: any) => {
		const input = event?.target?.value;
		if (!input) {
			validDarkColor = false;
			return;
		}
		const value = hex(input);
		if (isValidColor(value)) {
			validDarkColor = true;
			darkColorCalculated = toHex(value);
		} else {
			validDarkColor = false;
		}
	};

	const addColor = () => {
		currentTheme.addColor({
			name: colorName,
			light: lightColorCalculated,
			dark: darkColorCalculated
		});
		colorName = 'Color';
		lightColorInput = '#000000';
		lightColorCalculated = '#000000';
		darkColorInput = '#ffffff';
		darkColorCalculated = '#ffffff';
	};

	const action: Action = () => {
		const darkPicker = document.getElementById('dark-background-picker');
		// const darkShadow = darkPicker!.attachShadow({ mode: 'open' });
		// console.log(darkShadow);
	};
</script>

<svelte:document use:action />
<!-- Background inputs at top -->
<div class="mt-6 flex justify-around gap-4">
	<div class="flex items-center gap-2">
		<color-picker
			space="oklch"
			alpha
			color={currentTheme.lightBackground}
			oncolorchange={(e: { target?: { color: Color } }) => {
				if (e?.target?.color === undefined) return;
				currentTheme.lightBackground = e.target.color.toString({ format: 'hex' });
			}}
		></color-picker>
		<div
			class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
		>
			<label
				for="light-bg"
				class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>Light Background</label
			>
			<input
				type="text"
				id="light-bg"
				class="block h-full w-32 border-0 p-0 text-sm text-gray-900 placeholder-gray-500 focus:ring-0"
				placeholder="#ffffff"
				bind:value={currentTheme.lightBackground}
			/>
			{#if !validLightBackground}
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<svg
						class="h-4 w-4 text-red-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
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

	<div class="flex items-center gap-2">
		<div
			class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
		>
			<label
				for="dark-bg"
				class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>Dark Background</label
			>
			<input
				type="text"
				id="dark-bg"
				class="block h-full w-32 border-0 p-0 text-sm text-gray-900 placeholder-gray-500 focus:ring-0"
				placeholder="#000000"
				bind:value={currentTheme.darkBackground}
			/>
			{#if !validDarkBackground}
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<svg
						class="h-4 w-4 text-red-500"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
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
		<color-picker
			id="dark-background-picker"
			space="oklch"
			alpha
			color={currentTheme.darkBackground}
			oncolorchange={(e: { target?: { color: Color } }) => {
				if (e?.target?.color === undefined) return;
				currentTheme.darkBackground = e.target.color.toString({ format: 'hex' });
			}}
		></color-picker>
	</div>
</div>

<!-- Color inputs and previews -->
<div class="mt-6 flex flex-col gap-4">
	<!-- Name input -->
	<div
		class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
	>
		<label
			for="color-name"
			class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
			>Variable Name</label
		>
		<input
			type="text"
			id="color-name"
			class="block w-full border-0 p-0 text-lg text-gray-900 placeholder-gray-500 focus:ring-0"
			placeholder="Color"
			bind:value={colorName}
		/>
	</div>

	<!-- Light and Dark variants side by side -->
	<div class="grid grid-cols-2 gap-4">
		<!-- Light variant -->
		<div class="space-y-2">
			<h4 class="text-sm font-medium text-gray-700">Light Variant</h4>
			<div class="flex gap-2">
				<color-picker
					space="oklch"
					alpha
					color={lightColorCalculated}
					oncolorchange={(e: { target?: { color: Color } }) => {
						if (e?.target?.color === undefined) return;
						const hexColor = e.target.color.toString({ format: 'hex' });
						lightColorCalculated = hexColor;
						lightColorInput = hexColor;
						validLightColor = true;
					}}
				></color-picker>
				<div
					class="relative flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
				>
					<input
						oninput={updateLightColor}
						bind:value={lightColorInput}
						type="text"
						class="block w-full border-0 p-0 text-sm text-gray-900 placeholder-gray-500 focus:ring-0"
						placeholder="#000000"
					/>
					{#if !validLightColor}
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<svg
								class="h-4 w-4 text-red-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
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
			<div
				class="rounded-lg p-4 shadow"
				style:background={currentTheme.lightBackground}
				style:color={lightColorCalculated}
			>
				<p class="text-center text-lg font-medium">Sample text</p>
				<div class="mt-2 flex justify-around text-sm">
					<div>
						<div class="font-semibold">WCAG 2.2: {lightWcag}</div>
					</div>
					<div>
						<div class="font-semibold">WCAG 3.0: {lightApca}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Dark variant -->
		<div class="space-y-2">
			<h4 class="text-sm font-medium text-gray-700">Dark Variant</h4>
			<div class="flex gap-2">
				<color-picker
					space="oklch"
					alpha
					color={darkColorCalculated}
					oncolorchange={(e: { target?: { color: Color } }) => {
						if (e?.target?.color === undefined) return;
						const hexColor = e.target.color.toString({ format: 'hex' });
						darkColorCalculated = hexColor;
						darkColorInput = hexColor;
						validDarkColor = true;
					}}
				></color-picker>
				<div
					class="relative flex-1 rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
				>
					<input
						oninput={updateDarkColor}
						bind:value={darkColorInput}
						type="text"
						class="block w-full border-0 p-0 text-sm text-gray-900 placeholder-gray-500 focus:ring-0"
						placeholder="#ffffff"
					/>
					{#if !validDarkColor}
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
							<svg
								class="h-4 w-4 text-red-500"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
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
			<div
				class="rounded-lg p-4 shadow"
				style:background={currentTheme.darkBackground}
				style:color={darkColorCalculated}
			>
				<p class="text-center text-lg font-medium">Sample text</p>
				<div class="mt-2 flex justify-around text-sm">
					<div>
						<div class="font-semibold">WCAG 2.2: {darkWcag}</div>
					</div>
					<div>
						<div class="font-semibold">WCAG 3.0: {darkApca}</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Add button -->
	<div class="flex justify-center">
		<button
			onclick={addColor}
			type="button"
			class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
		>
			<svg
				class="mr-2 -ml-1 h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
			Add Color
		</button>
	</div>
</div>

<style>
	color-picker#dark-background-picker {
		grid-template-columns: 1fr 3fr;
	}

	color-picker#dark-background-picker::part(sliders) {
		order: 1;
	}
</style>
