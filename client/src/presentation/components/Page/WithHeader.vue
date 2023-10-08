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
  /* background-color: var(--color-bg); */
  /* padding-bottom: 16px; */

  --content-radius: 16px;
  /* height: 100vh; */
  /* overflow: hidden; */
  /* scroll-behavior: smooth; */
  /* display: grid; */
  /* grid-template-rows: auto 1fr; */
}
.page-header {
  /* padding: 4px 0 calc(2px + var(--content-radius)); */
  background-color: var(--color-bg);
  position: fixed;
  top: 0;
  transform: translateZ(0);
  z-index: 2;
}

.page-content {
  padding-top: v-bind('headerHeight + "px"');
  /* height: 100%; */
  /* overflow: auto; */
  /* scroll-behavior: smooth; */
  /* padding-bottom: 100px; */
  /* box-shadow: -3px 0 40px -10px rgba(0, 0, 0, 0.3); */

  /* &::before {
    content: '';
    display: block;
    height: var(--content-radius);
    width: 100%;
    border-radius: var(--content-radius) var(--content-radius) 0 0;
    background-color: var(--color-bg-secondary);
    transform: translateY(-10px);
  } */
}
</style>
