<script lang="ts">
	import { currentTheme } from '$lib/stores.svelte';
	import { hex, isValidColor, toHex } from 'a11y-color-contrast';
	import { calcApca, calcWcag } from '$lib/helpers';

	let colorToAdd = $state('#ffffff');
	let calculatedColor = $state('#ffffff');
	let validColor = $state(true);

	let validBackground = $derived(isValidColor(hex(currentTheme.background)));
	let newColorWcag = $derived(calcWcag(calculatedColor, currentTheme.background));
	let newColorApca = $derived(calcApca(calculatedColor, currentTheme.background));

	const updateColor = (event: any) => {
		const value = hex(event.target.value);
		if (isValidColor(value)) {
			validColor = true;
			calculatedColor = toHex(value);
		} else {
			validColor = false;
		}
	};

	const addColor = () => {
		currentTheme.addColor({ name: 'Color', color: calculatedColor });
		colorToAdd = '#ffffff';
		calculatedColor = '#ffffff';
	};
</script>

<div class="mt-6 h-36 lg:flex lg:items-start lg:justify-between">
	<div class="flex">
		<div
			class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
		>
			<label
				for="name"
				class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>Foreground</label
			>
			<input
				oninput={updateColor}
				bind:value={colorToAdd}
				type="text"
				name="name"
				id="name"
				class="block h-full w-40 border-0 p-0 text-xl text-gray-900 placeholder-gray-500 focus:ring-0"
				placeholder="#ffffff"
			/>
			{#if !validColor}
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
			class="ml-2 rounded-md border border-gray-300 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
		>
			<input
				class="block h-14 w-14 cursor-pointer border-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
				type="color"
				bind:value={calculatedColor}
			/>
		</div>
	</div>

	<div class="mx-2 flex w-full flex-col">
		<div class="flex justify-around">
			<div>
				<dt class="text-base font-normal">WCAG 2.2</dt>
				<dd class="mt-1 md:block lg:flex">
					<div class="flex items-baseline text-2xl font-semibold">{newColorWcag}</div>
				</dd>
			</div>
			<div
				class="rounded px-4 py-2 text-3xl shadow"
				style:background={currentTheme.background}
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

		<span class="mt-2 self-center sm:ml-3">
			<button
				onclick={addColor}
				type="button"
				class="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
			>
				<svg
					class="mr-2 -ml-1 h-5 w-5"
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
			class="mr-2 rounded-md border border-gray-300 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
		>
			<input
				class="block h-14 w-14 cursor-pointer border-transparent p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
				type="color"
				bind:value={currentTheme.background}
			/>
		</div>
		<div
			class="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600"
		>
			<label
				for="name"
				class="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
				>Background</label
			>
			<input
				type="text"
				name="name"
				id="name"
				class="block h-full w-40 border-0 p-0 text-xl text-gray-900 placeholder-gray-500 focus:ring-0"
				placeholder="#000000"
				bind:value={currentTheme.background}
			/>
			{#if !validBackground}
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
