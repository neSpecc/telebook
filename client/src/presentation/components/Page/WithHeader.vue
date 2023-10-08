<script setup lang="ts">
import { onMounted, ref } from 'vue'

// const { setAppBackground } = useAppStyle()

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
  <div
    ref="header"
    class="page-header"
  >
    <slot name="header" />
  </div>
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
  /* position: fixed; */
  top: 0;
  transform: translateZ(0);
  z-index: 2;
}

.page-content {
  padding-top: v-bind('headerHeight + "px"');
}
</style>
