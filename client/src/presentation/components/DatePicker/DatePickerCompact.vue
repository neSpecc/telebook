<script setup lang="ts">
import { computed } from 'vue'
import { formatDate } from '@/infra/utils/date'

const props = defineProps<{
  /**
   * Visible value
   */
  value?: Date;
}>()

/**
 * Formats the date to a readable format
 */
const dateVisible = computed(() => {
  if (props.value === undefined) {
    return 'Select date'
  }

  return formatDate(props.value)
})
</script>

<template>
  <div class="picker-compact">
    {{ dateVisible }}
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';
.picker-compact {
  @apply --headline;

  padding: 6px 14px;
  border-radius: var(--size-border-radius-small);
  background-color: var(--color-bg-tertiary);
  user-select: none;

  @media (hover: hover) {
    cursor: pointer;
  }
}
</style>
