<script lang="ts" setup>
import { Icon } from '@/presentation/components'

defineProps<{
  icon: string;
  type: 'square' | 'circle';
}>()
</script>
<template>
  <div
    class="li-icon"
    :class="`li-icon--${type}`"
  >
    <Icon :name="icon" />
  </div>
</template>

<style lang="postcss" scoped>
.li-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  &--circle {
    width: var(--size-avatar-medium);
    height: var(--size-avatar-medium);
    border-radius: var(--size-border-radius);
    border-radius: 50%;
    background: linear-gradient(156.88deg, #00E7FF 14.96%, #007AFF 85.04%);
  }

  :deep(.icon) svg {
    fill: #fff;

    animation: jump-in 250ms ease;
  }

  &--square {
  }
}


@keyframes jump-in {
  0% {
    transform: scale(0.8);
  }

  80% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
