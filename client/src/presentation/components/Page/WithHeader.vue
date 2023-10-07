<script setup lang="ts">
import { useScroll } from '@/application/services'
// import { onBeforeMount } from 'vue';

// const { setAppBackground } = useAppStyle()

// onBeforeMount(() => {
//   setAppBackground('var(--color-bg-secondary)')
// })
</script>
<template>
  <div class="page">
    <div class="page-header">
      <slot name="header" />
    </div>
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
  height: 100vh;
  /* overflow: hidden; */
  /* scroll-behavior: smooth; */
  display: grid;
  grid-template-rows: auto 1fr;
}
.page-header {
  /* padding: 4px 0 calc(2px + var(--content-radius)); */
  background-color: var(--color-bg);
  position: sticky;
  top: 0;

  &:deep(.subtitle) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.page-content {
  height: 100%;
  overflow: auto;
  scroll-behavior: smooth;
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
