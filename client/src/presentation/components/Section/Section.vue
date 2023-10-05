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
   * @deprecated
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
    padding-inline: 16px;
  }

  &--standalone {
    border-radius: var(--size-border-radius-big);
    margin: 0 16px;
  }

  &__title {
    @apply --footnote-caps;

    color: var(--color-hint);
    padding: 5px 16px 6px;
  }
}
</style>
