<script setup lang="ts">
// import { useAppStyle } from '@/application/services'
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

  --content-radius: 16px
}

.page-header {
  padding: 4px 0 calc(2px + var(--content-radius));
  background-color: var(--color-bg);
}

.page-content {
  /* padding-bottom: 100px; */

  /* box-shadow: -3px 0 40px -10px rgba(0, 0, 0, 0.3); */

  /* :deep(.placeholder), */
  :deep(.section) {
    /* background-color: var(--color-bg-secondary); */
    border-radius: var(--size-border-radius-large);
    margin-bottom: 30px;
  }

  &::before {
    content: '';
    display: block;
    height: var(--content-radius);
    width: 100%;
    border-radius: var(--content-radius) var(--content-radius) 0 0;
    background-color: var(--color-bg-secondary);
    transform: translateY(-10px);
  }
}
</style>
