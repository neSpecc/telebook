<script setup lang="ts">
import WebApp from '@twa-dev/sdk'
import { onMounted } from 'vue'

onMounted(() => {
  WebApp.headerColor = '#00aaff'
})
</script>

<template>
  <div>
    Room description
  </div>
</template>


<style scoped>

</style>
