<script setup lang="ts">
import { onMounted, ref } from 'vue'

const header = ref<HTMLDivElement | null>(null)
const headerHeight = ref(59)

onMounted(() => {
  if (header.value === null) {
    return
  }

  headerHeight.value = header.value.clientHeight
})
</script>
<template>
  <Teleport to=".app-header">
      <div
        ref="header"
        class="page-header"
      >
      <slot name="header" />
    </div>
  </Teleport>
  <div class="page">
    <div class="page-content">
      <slot name="content" />
    </div>
  </div>
</template>


<style scoped>
.page {
}
.page-header {
  background-color: var(--color-bg);
  animation: header-in 200ms ease;
}

@keyframes header-in {
  from {
    transform: translateY(-100%);
  }
}

.page-content {
  padding-top: v-bind('headerHeight + "px"');
}
</style>
