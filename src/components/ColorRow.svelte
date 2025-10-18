<script lang="ts">
	import { currentTheme } from '$lib/stores.svelte';
	import { calcApca, calcWcag, type ThemeColor } from '$lib/helpers';
	import ValidColorIcon from './ValidColorIcon.svelte';
	import EditableRow from './EditableRow.svelte';

	let { color }: { color: ThemeColor } = $props();

	const removeColor = () => {
		currentTheme.update((theme) => {
			let idx = theme.colors.findIndex((c) => c.name === color.name);
			theme.colors = theme.colors.filter((_, i) => i !== idx);
			return theme;
		});
	};

	// Calculate contrast for light variant against light background
	let lightWcag = $derived(
		color.light && currentTheme.lightBackground
			? calcWcag(color.light, currentTheme.lightBackground)
			: 0
	);
	let lightApca = $derived(
		color.light && currentTheme.lightBackground
			? calcApca(color.light, currentTheme.lightBackground)
			: 0
	);
	let validLightWcag = $derived(!Number.isNaN(lightWcag) && lightWcag >= 7.5);
	let validLightApca = $derived(!Number.isNaN(lightApca) && lightApca >= 70);

	// Calculate contrast for dark variant against dark background
	let darkWcag = $derived(
		color.dark && currentTheme.darkBackground
			? calcWcag(color.dark, currentTheme.darkBackground)
			: 0
	);
	let darkApca = $derived(
		color.dark && currentTheme.darkBackground
			? calcApca(color.dark, currentTheme.darkBackground)
			: 0
	);
	let validDarkWcag = $derived(!Number.isNaN(darkWcag) && darkWcag >= 7.5);
	let validDarkApca = $derived(!Number.isNaN(darkApca) && darkApca >= 70);
</script>

<div>
	<dl
		class="mt-5 grid grid-cols-5 divide-x divide-gray-200 overflow-hidden rounded-lg bg-white shadow"
	>
		<!-- Left: Light variant -->
		<EditableRow {color} variant="light" background={currentTheme.lightBackground} />

		<!-- Light contrast data -->
		<div class="flex flex-col justify-around px-4 py-5 sm:p-6">
			<div class="flex items-center justify-between">
				<div>
					<dt class="text-base font-normal">WCAG 2.2</dt>
					<dd class="mt-1">
						<div class="flex items-baseline text-2xl font-semibold">{lightWcag}</div>
					</dd>
				</div>
				<ValidColorIcon valid={validLightWcag} />
			</div>

			<div class="flex items-center justify-between">
				<div>
					<dt class="text-base font-normal">WCAG 3.0</dt>
					<dd class="mt-1">
						<div class="flex items-baseline text-2xl font-semibold">{lightApca}</div>
					</dd>
				</div>
				<ValidColorIcon valid={validLightApca} />
			</div>
		</div>

		<!-- Center: Action buttons -->
		<div class="flex items-center justify-center px-2 py-5">
			<button
				onclick={removeColor}
				aria-label="Remove color"
				class="inline-flex items-center justify-center rounded p-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
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

		<!-- Dark contrast data -->
		<div class="flex flex-col justify-around px-4 py-5 sm:p-6">
			<div class="flex items-center justify-between">
				<ValidColorIcon valid={validDarkWcag} />
				<div class="text-right">
					<dt class="text-base font-normal">WCAG 2.2</dt>
					<dd class="mt-1">
						<div class="flex items-baseline justify-end text-2xl font-semibold">{darkWcag}</div>
					</dd>
				</div>
			</div>

			<div class="flex items-center justify-between">
				<ValidColorIcon valid={validDarkApca} />
				<div class="text-right">
					<dt class="text-base font-normal">WCAG 3.0</dt>
					<dd class="mt-1">
						<div class="flex items-baseline justify-end text-2xl font-semibold">{darkApca}</div>
					</dd>
				</div>
			</div>
		</div>

		<!-- Right: Dark variant -->
		<EditableRow {color} variant="dark" background={currentTheme.darkBackground} />
	</dl>
</div>
