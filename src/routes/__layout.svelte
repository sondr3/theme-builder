<script>
  import "../app.css";
</script>

<div class="min-h-full">
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
          <div class="-my-px ml-6 flex space-x-8">
            <a
              href="/"
              class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              aria-current="page"
            >
              Home
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>

  <div class="py-10">
    <main class="max-w-7xl mx-auto px-6 lg:px-8">
      <slot />
    </main>
  </div>
</div>
