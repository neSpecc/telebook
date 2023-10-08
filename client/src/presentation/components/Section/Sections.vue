<script setup lang="ts">
</script>

<template>
  <div
    class="sections"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
.sections {
  display: grid;
  gap: 24px;
  padding: var(--size-cell-v-margin) 0
}

.is-material .sections {
  gap: 14px;
}
</style>
