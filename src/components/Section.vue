<script setup lang="ts">
defineProps<{
  withBackground?: boolean;
}>()
</script>

<template>
  <div
    class="section"
    :class="{
      'section--bg': withBackground
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
}
</style>
