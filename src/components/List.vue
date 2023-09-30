<script setup lang="ts">
defineProps<{
  /**
   * Whether to add a gap between each item
   */
  gapped?: boolean;
}>()
</script>

<template>
  <div
    class="list"
    :style="{
      '--gap': gapped ? '6px' : '0',
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.list {
  display: grid;
  grid-gap: var(--gap);
}
</style>
