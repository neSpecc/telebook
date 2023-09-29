<script setup lang="ts">
defineProps<{
  padded?: boolean;
}>()
</script>

<template>
  <div
    class="list"
    :class="{
      'list--padded': padded
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.list {
  display: grid;
  grid-gap: 6px;

  &--padded {
    padding-inline: 16px;
  }
}
</style>
