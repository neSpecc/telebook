<script lang=ts setup>
import { Amount } from '@/presentation/components'

defineProps<{
  /**
   * Rating value 0 — 5
   */
  value: number;
}>()
</script>
<template>
  <div :class="$style.rating">
    <Amount>
      {{ value }}
    </Amount>
    <div :class="$style.stars">
      <template
        v-for="i in 5"
        :key="`star${i}`"
      >
        {{ i <= value ? '★' : '☆' }}
      </template>
    </div>
  </div>
</template>

<style module>
.rating {
  text-align: center;
  color: var(--color-hint);
}

.stars {
  font-size: 8px;
  margin-top: 4px;
}
</style>
