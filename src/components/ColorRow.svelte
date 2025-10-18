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

	let wcag = $derived(calcWcag(color.color, currentTheme.background));
	let apca = $derived(calcApca(color.color, currentTheme.background));
	let validWcag = $derived(!Number.isNaN(wcag) && wcag >= 7.5);
	let validApca = $derived(!Number.isNaN(apca) && apca >= 70);
</script>

<div>
	<dl
		class="grid-cols-color-row mt-5 grid divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:divide-x md:divide-y-0"
		style:background-color={currentTheme.background}
		style:color={color.color}
	>
		<EditableRow {color} />

		<div class="flex justify-between px-4 py-5 sm:p-6">
			<div>
				<dt class="text-base font-normal">WCAG 2.2</dt>
				<dd class="mt-1 md:block lg:flex">
					<div class="flex items-baseline text-2xl font-semibold">{wcag}</div>
				</dd>
			</div>

			<ValidColorIcon valid={validWcag} color={color.color} />
		</div>

		<div class="flex justify-between px-4 py-5 sm:p-6">
			<div>
				<dt class="text-base font-normal">WCAG 3.0</dt>
				<dd class="mt-1 md:block lg:flex">
					<div class="flex items-baseline text-2xl font-semibold">{apca}</div>
				</dd>
			</div>

			<ValidColorIcon valid={validApca} color={color.color} />
		</div>
		<div class="flex justify-center px-1 py-1">
			<button
				onclick={removeColor}
				class="float-right inline-flex items-center justify-center p-2 text-gray-800 focus:outline-none"
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
