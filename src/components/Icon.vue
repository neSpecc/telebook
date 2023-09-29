<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import InlineSvg from 'vue-inline-svg'

const props = defineProps<{
  /**
   * Name of the icon
   */
  name: string;
}>()

const source = ref()

watchEffect(async () => {
  try {
    source.value = (await import(/* @vite-ignore */ `../assets/icons/${props.name}.svg`)).default
  } catch (e) {
    console.error(e)
  }
})
</script>

<template>
  <InlineSvg
    class="icon"
    :src="source"
  />
</template>
<style scoped>
</style>
