<script setup lang="ts">
defineProps<{
  /**
   * Will be placed at top-left corner near the number
   */
  label?: string;
}>()
</script>

<template>
  <div class="number">

    <span
      v-if="label"
      class="label"
    >
      {{ label }}
    </span>
    <slot />

    <div
      v-if="$slots.subline"
      class="subline"
    >
      <slot name="subline" />
    </div>
  </div>
</template>

<style scoped>
@import '../styles/theme/typescale.css';
.number {
  @apply --title-3-rounded-semibold;
}

.subline {
  @apply --subheadline-2-rounded-semibold;

  color: var(--color-text-secondary);
  color: var(--color-hint);
}

.label {
  @apply --footnote-rounded-semibold;

  color: var(--color-hint);
  vertical-align: text-top;
  line-height: 24px;
}
</style>
