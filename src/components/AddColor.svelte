<script lang="ts">
	import { currentTheme } from '$lib/stores.svelte';
	import { calcApca, calcWcag } from '$lib/helpers';
	import Color from 'colorjs.io';

	let colorName = $state('Color');
	let darkColor = $state(new Color('oklch(100% 0 180)'));
	let lightColor = $state(new Color('oklch(0% 0 180)'));

	// Light variant contrast calculations
	let lightWcag = $derived(calcWcag(lightColor, currentTheme.lightBackground));
	let lightApca = $derived(calcApca(lightColor, currentTheme.lightBackground));

	// Dark variant contrast calculations
	let darkWcag = $derived(calcWcag(darkColor, currentTheme.darkBackground));
	let darkApca = $derived(calcApca(darkColor, currentTheme.darkBackground));

	const colorFromEvent = (e: { target?: { color: Color } }): Color => {
		const { spaceId, coords, alpha } = e.target!.color;
		return new Color({ spaceId, coords, alpha });
	};

	const addColor = () => {
		currentTheme.addColor({
			name: colorName,
			light: lightColor,
			dark: darkColor
		});
		colorName = 'Color';
		darkColor = new Color('oklch(100% 0 180)');
		lightColor = new Color('oklch(0% 0 180)');
	};
</script>

<!-- Background Colors Section -->
<section class="mt-6 rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
	<h3 class="mb-4 text-lg font-semibold text-gray-900">Background Colors</h3>
	<div class="flex justify-between gap-8">
		<color-picker
			id="light-background-picker"
			space="oklch"
			alpha
			color={currentTheme.lightBackground.toString({ format: 'oklch' })}
			oncolorchange={(e: { target?: { color: Color } }) => {
				if (e?.target?.color === undefined) return;
				currentTheme.lightBackground = colorFromEvent(e);
			}}
		></color-picker>
		<color-picker
			id="dark-background-picker"
			space="oklch"
			alpha
			color={currentTheme.darkBackground.toString({ format: 'oklch' })}
			oncolorchange={(e: { target?: { color: Color } }) => {
				if (e?.target?.color === undefined) return;
				currentTheme.darkBackground = colorFromEvent(e);
			}}
		></color-picker>
	</div>
</section>

<!-- Add New Color Section -->
<section class="mt-8 rounded-lg border-2 border-gray-200 bg-white p-6">
	<h3 class="mb-6 text-lg font-semibold text-gray-900">Add New Color</h3>
	<div class="flex flex-col gap-6">
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

		<!-- Divider -->
		<div class="border-t border-gray-200"></div>

		<!-- Light and Dark variants side by side -->
		<div>
			<h4 class="mb-4 text-base font-medium text-gray-900">Color Variants</h4>
			<div class="grid grid-cols-2 gap-6">
				<!-- Light variant -->
				<div class="space-y-2">
					<h5 class="text-sm font-medium text-gray-600">Light Variant</h5>
					<div class="flex gap-2">
						<color-picker
							id="light-foreground-picker"
							space="oklch"
							alpha
							color={lightColor.toString({ format: 'oklch' })}
							oncolorchange={(e: { target?: { color: Color } }) => {
								if (e?.target?.color === undefined) return;
								lightColor = colorFromEvent(e);
							}}
						></color-picker>
						<div
							class="flex flex-1 basis-auto flex-col items-center justify-around rounded-lg p-4 shadow"
							style:background={currentTheme.lightBackground.toString({ format: 'hex' })}
							style:color={lightColor.toString({ format: 'hex' })}
						>
							<p class="text-center text-2xl font-medium">Sample text</p>
							<p class="text-center text-sm opacity-75">{lightColor}</p>
							<div class="flex w-full justify-between text-base">
								<div>
									<div class="font-semibold">WCAG: {lightWcag}</div>
								</div>
								<div>
									<div class="font-semibold">APCA: {lightApca}</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<!-- Dark variant -->
				<div class="space-y-2">
					<h5 class="text-sm font-medium text-gray-600">Dark Variant</h5>
					<div class="flex gap-2">
						<div
							class="flex flex-1 basis-auto flex-col items-center justify-around rounded-lg p-4 shadow"
							style:background={currentTheme.darkBackground.toString({ format: 'hex' })}
							style:color={darkColor.toString({ format: 'hex' })}
						>
							<p class="text-center text-2xl font-medium">Sample text</p>
							<p class="text-center text-sm opacity-75">{darkColor}</p>
							<div class="flex w-full justify-between text-base">
								<div>
									<div class="font-semibold">WCAG: {darkWcag}</div>
								</div>
								<div>
									<div class="font-semibold">APCA: {darkApca}</div>
								</div>
							</div>
						</div>
						<color-picker
							id="dark-foreground-picker"
							space="oklch"
							alpha
							color={darkColor.toString({ format: 'oklch' })}
							oncolorchange={(e: { target?: { color: Color } }) => {
								if (e?.target?.color === undefined) return;
								darkColor = colorFromEvent(e);
							}}
						></color-picker>
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
</section>

<style>
	color-picker {
		width: 70%;
	}

	color-picker#light-background-picker {
		grid-template-columns: 3fr 2fr;
	}

	color-picker#dark-background-picker {
		grid-template-columns: 2fr 3fr;
	}

	color-picker#dark-background-picker::part(sliders) {
		order: 1;
	}

	color-picker#light-foreground-picker {
		grid-template-columns: 3fr 2fr;
	}

	color-picker#dark-foreground-picker {
		grid-template-columns: 2fr 3fr;
	}

	color-picker#dark-foreground-picker::part(sliders) {
		order: 1;
	}
</style>
