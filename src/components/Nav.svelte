<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<nav class="border-b border-gray-200 bg-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 justify-between">
			<div class="flex">
				<div class="flex flex-shrink-0 items-center">
					<img
						class="h-8 w-auto"
						src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
						alt="Workflow"
					/>
				</div>
				<NavLink href="/" name="Home" />
				<NavLink href="/themes" name="Themes" />
			</div>
		</div>
	</div>
</nav>
