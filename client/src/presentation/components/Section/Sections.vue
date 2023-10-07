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
  /* padding: 16px 0; */
}
</style>
