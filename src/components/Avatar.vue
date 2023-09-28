<script setup lang="ts">
defineProps<{
  /**
   * Picture src
   */
  src?: string;

  /**
   * Used when the image is not available
   */
  name?: string;
}>()
</script>

<template>
  <div class="avatar">
    <img
      v-if="src"
      :src="src"
      :alt="name ?? ''"
    >
    <div
      v-else
      class="placeholder"
    />
  </div>
</template>

<style scoped lang="postcss">
.list-item {
  --size: var(--size-avatar-medium);

  img {
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
  }
}
</style>
