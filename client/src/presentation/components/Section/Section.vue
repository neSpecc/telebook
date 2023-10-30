<script setup lang="ts">
defineProps<{
  /**
   * Adds background color
   */
  withBackground?: boolean;

  /**
   * Adds horizontal paddings
   */
  padded?: boolean;

  /**
   * Whether to display list as a standalone island
   */
  standalone?: boolean;

  /**
   * Section title will be placed above the content
   */
  title?: string;
}>()
</script>

<template>
  <div
    class="section"
    :class="{
      'section--bg': withBackground,
      'section--padded': padded,
      'section--standalone': standalone
    }"
  >
    <div
      v-if="title"
      class="section__title"
    >
      {{ title }}
    </div>
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '@/presentation/styles/theme/typescale.css';
.section {
  &--bg {
    background-color: var(--color-bg);
  }

  &--padded {
    padding-inline: var(--size-cell-h-margin);
  }

  &--standalone {
    border-radius: var(--size-border-radius-big);
    margin: 0 var(--size-cell-h-margin);
  }

  &__title {
    @apply --footnote-caps;

    color: var(--color-hint);
    padding: 5px var(--size-cell-h-padding) 6px;
  }
}
.is-material .section {
  &--bg {
    box-shadow: 0 0 0 1px var(--color-island-shadow);
  }

  &__title {
    background-color: var(--color-bg);
    transform: translateY(1px);
    padding-top: 16px;
    box-shadow: 0 -1px 0 0 var(--color-island-shadow);
    color: var(--color-link);

    @apply --body;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: unset;
  }
}
</style>
