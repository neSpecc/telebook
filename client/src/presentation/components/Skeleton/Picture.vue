<script setup lang="ts">
defineProps<{
  size: 'big' | 'medium' | 'small';
  style: 'circle' | 'square';
}>()
</script>
<template>
  <div
    :class="$style.pic"
    :style="{
      '--size': `var(--size-avatar-${ size })`,
      '--radius': style === 'circle' ? '50%' : 'var(--size-border-radius-medium)'
    }"
  />
</template>

<style module>
@import '@/presentation/styles/theme/animations.css';
.pic {
  display: block;
  width: var(--size);
  height: var(--size);
  border-radius: var(--radius);

  @apply --animation-skeleton;
}
</style>
