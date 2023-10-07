<script lang=ts setup>
import { Amount } from '@/presentation/components'

defineProps<{
  /**
   * Number to be formatted
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
}

.stars {
  font-size: 8px;
  margin-top: 4px;
}
</style>
