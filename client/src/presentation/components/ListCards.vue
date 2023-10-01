<script setup lang="ts">
// defineProps<{
//   padded?: boolean;
// }>()
</script>

<template>
  <div
    class="list-cards"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.list-cards {
  display: grid;
  grid-gap: 20px;
}
</style>
