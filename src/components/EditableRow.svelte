<script lang="ts">
	import type { ThemeColor } from '$lib/helpers';
	import type Color from 'colorjs.io';

	let {
		color,
		variant,
		background
	}: { color: ThemeColor; variant: 'light' | 'dark'; background: Color } = $props();

	let currentColor = $derived(variant === 'light' ? color.light : color.dark);
</script>

<div
	class="flex h-full flex-col items-center justify-center px-4 py-5 sm:p-6"
	style:background-color={background.toString({ format: 'hex' })}
>
	<dt
		class="text-center text-base font-normal"
		style:color={currentColor.toString({ format: 'hex' })}
	>
		{color.name}
	</dt>
	<dd class="mt-1 text-center" style:color={currentColor.toString({ format: 'hex' })}>
		<div class="text-2xl font-semibold">
			{currentColor}
		</div>
	</dd>
</div>
