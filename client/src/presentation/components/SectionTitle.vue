<script setup lang="ts">
defineProps<{
  padded?: boolean;
}>()
</script>

<template>
  <div
    class="section-title"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.section-title {
  @apply --footnote-caps;

  color: var(--color-hint);
  padding: 5px 16px;
}
</style>
