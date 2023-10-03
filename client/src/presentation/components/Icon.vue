<script setup lang="ts">
import { useIcon } from '@/application/services/useIcon'

const props = defineProps<{
  /**
   * Name of the icon
   */
  name: string;
}>()

const { source } = useIcon(props.name)
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
