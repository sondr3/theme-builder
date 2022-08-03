<script lang="ts">
  import NavLink from "./NavLink.svelte";
</script>

<nav class="bg-white border-b border-gray-200">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
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
