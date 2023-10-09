<script setup lang="ts">
import { onMounted, ref } from 'vue'

const props = defineProps<{
  /**
   * Name of the icon
   */
  name: string;
}>()

const source = ref('')

onMounted(async () => {
  const s = await import(`../../assets/icons/${props.name}.svg?raw`)

  console.log('s', s)

  source.value = s.default
})
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    class="icon"
    :class="[`icon-${name}`]"
    v-html="source"
  />
</template>
<style>
</style>
