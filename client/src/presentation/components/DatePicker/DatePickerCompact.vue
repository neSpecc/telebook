<script setup lang="ts">
import { computed } from 'vue'

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

  /**
   * Convert Date to "4 Cct 2023" format
   */
  const day = props.value.getDate()
  const month = props.value.toLocaleString('default', { month: 'short' })
  const year = props.value.getFullYear()

  return `${day} ${month} ${year}`
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

  padding: 6px 10px;
  border-radius: 7px;
  background-color: var(--color-bg-tertiary);
  user-select: none;
}
</style>
