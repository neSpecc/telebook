<script setup lang="ts">
defineProps<{
  withBackground?: boolean;
  padded?: boolean;
  standalone?: boolean;
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
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.section {
  &--bg {
    background-color: var(--color-bg);
    padding-top: 10px;
  }

  &--padded {
    padding-inline: 16px;
  }

  &--standalone {
    border-radius: 16px;
    margin: 0 16px;
  }
}
</style>
