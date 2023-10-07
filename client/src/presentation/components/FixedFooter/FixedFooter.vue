<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * Bottom offset
   */
  bottom: number;
}>(), {
  bottom: 0,
})
</script>
<template>
  <div :class="$style.footer">
    <slot />
  </div>
</template>

<style module>
.footer {
  position: sticky;
  right: 0;
  left: 0;
  bottom: v-bind('bottom + "px"');
}
</style>
