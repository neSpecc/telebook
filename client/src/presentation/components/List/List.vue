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
      'list--standalone': standalone,
      'list--gapped': gapped,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '@/presentation/styles/theme/typescale.css';
.list {
  display: grid;
  grid-auto-rows: min-content;

  &--gapped {
    grid-gap: 6px;
  }

  &--bg {
    background-color: var(--color-bg);
  }

  &--standalone {
    border-radius: var(--size-border-radius-big);
  }
}

.is-material .list {
  &--gapped {
    grid-gap: 4px;
  }

  &--bg {
    box-shadow: 0 0 0 1px var(--color-island-shadow);
  }
}
</style>
