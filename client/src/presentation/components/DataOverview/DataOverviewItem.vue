<script setup lang="ts">
defineProps<{
  /**
   * Title of the item
   */
  title: string;
}>()
</script>

<template>
  <div class="data-table-item">
    <div class="title">
      {{ title }}
    </div>

    <div class="content">
      <slot name="content" />
    </div>

    <div class="footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';
.data-table-item {
  display: grid;
  grid-gap: 4px;
  padding-inline: 10px;
  min-width: 95px;

  color: var(--color-hint);

  @apply --caption-2;
  justify-items: center;
  justify-content: center;

  .title {
    display: grid;
    line-height: 20px;
    text-transform: uppercase;
  }

  .content {
    display: grid;
    height: 27px;
    align-items: center;
  }
}
</style>
