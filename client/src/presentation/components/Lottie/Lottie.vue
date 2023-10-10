<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'

defineProps<{
  animationData: object;
  width: string;
  height: string;
}>()
</script>

<template>
   <Vue3Lottie
    :animation-data="animationData"
    :width="width"
    :height="height"
  />
</template>

<style scoped>

</style>

<docs>

Lottie component allows you to render an animation from a JSON file. You can find more information about Lottie [here](https://airbnb.design/lottie/).

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| animationData | `object` | `undefined` | The animation data. |
| width | `string` | `undefined` | The width of the animation. |
| height | `string` | `undefined` | The height of the animation. |

</docs>
