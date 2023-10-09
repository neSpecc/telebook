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
  const svg = await import(`../../assets/icons/${props.name}.svg?raw`)

  source.value = svg.default
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
