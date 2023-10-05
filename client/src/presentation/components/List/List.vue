<script setup lang="ts">
defineProps<{
  /**
   * Whether to add a gap between each item
   */
  gapped?: boolean;
  withBackground?: boolean;
  // padded?: boolean;
  standalone?: boolean;
}>()
</script>

<template>
  <div
    class="list"
    :class="{
      'list--bg': withBackground,
      'list--standalone': standalone
    }"
    :style="{
      '--gap': gapped ? '6px' : '0',
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '@/presentation/styles/theme/typescale.css';
.list {
  display: grid;
  grid-gap: var(--gap);

  &--bg {
    background-color: var(--color-bg);
  }

  &--standalone {
    border-radius: var(--size-border-radius-big);
  }
}
</style>
