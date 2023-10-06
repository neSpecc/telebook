<script setup lang="ts">

</script>
<template>
  <div class="text-block">
    <slot />
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.text-block {
  border-radius: var(--size-border-radius-big);
  background-color: var(--color-bg);
  padding: 10px var(--size-cell-h-padding);

  @apply --callout;
}
</style>
