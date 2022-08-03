<script lang="ts">
  export let title: string;
  export let description: string;
</script>

<div class="pb-5 border-b border-gray-200">
  <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
  <p class="mt-2 max-w-4xl text-sm text-gray-500">
    {description}
  </p>
</div>
