<script>
  import Nav from "$components/Nav.svelte";
  import "../app.css";
</script>

<div class="min-h-full">
  <Nav />

  <div class="py-10">
    <main class="max-w-7xl mx-auto px-6 lg:px-8">
      <slot />
    </main>
  </div>
</div>
