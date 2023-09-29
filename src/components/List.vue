<script setup lang="ts">
// defineProps<{
//   padded?: boolean;
// }>()
</script>

<template>
  <div
    class="list"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.list {
  display: grid;
  grid-gap: 6px;
}
</style>
