<script setup lang="ts">
import { onMounted } from 'vue'

withDefaults(defineProps<{
  /**
   * Bottom offset
   */
  bottom: number;
}>(), {
  bottom: 0,
})

onMounted(() => {
})
</script>
<template>
  <div
    ref="footer"
    :class="$style.footer"
  >
    <slot />
  </div>
</template>

<style module>
.footer {
  position: fixed;
  right: 0;
  left: 0;
  top: calc(var(--tg-viewport-stable-height));
  z-index: 2;
  transform: translateY(-100%);
  transition: top 200ms ease;
  will-change: top;
}
</style>
