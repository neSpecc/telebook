<script setup lang="ts">
import DataOverviewItem from './DataOverviewItem.vue'
import { Amount, Icon } from '@/presentation/components'
import type { Rating, Award, Chart } from '@/domain/entities'

defineProps<{
  rating: Rating;
  award: Award;
  chart: Chart;
}>()
</script>

<template>
  <div class="data-table">
    <DataOverviewItem
      :title="`${rating.votesCount} ratings`"
    >
      <template #content>
        <Amount>
          {{ rating.rating }}
        </Amount>
      </template>

      <template #footer>
        <!-- eslint-disable vue/no-v-html -->
        <template
          v-for="index in 5"
          :key="index"
        >
          {{ index <= rating.rating ? '★' : '☆' }}
        </template>
      </template>
    </DataOverviewItem>

    <div class="divider" />

    <DataOverviewItem
      title="Awards"
    >
      <template #content>
        <div class="award">
          <Icon name="laurel-left" />
          <div class="award-text">
            {{ award.name }}
          </div>
          <Icon name="laurel-right" />
        </div>
      </template>

      <template #footer>
        {{ award.section }}
      </template>
    </DataOverviewItem>

    <div class="divider" />

    <DataOverviewItem
      title="Charts"
    >
      <template #content>
        <Amount prefix="No.">
          {{ chart.place }}
        </Amount>
      </template>

      <template #footer>
        {{ chart.category }}
      </template>
    </DataOverviewItem>
  </div>
</template>

<style scoped>
.data-table {
  display: grid;
  grid-template-columns: fit-content(100%) 1px fit-content(100%) 1px fit-content(100%);
  grid-gap: 8px;
  align-items: center;
  padding-block: 10px;
  justify-content: center;

  .divider {
    height: 40px;
    width: 0.5px;
    background-color: var(--separator-color);
  }

  :deep(.number){
    font-size: 23px;
  }

  .award {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;

    &-text {
      max-width: 40px;
      text-align: center;
    }
    .icon {
      width: 11px;
      height: 23px;
      fill: var(--color-hint);
    }
  }
}
</style>
