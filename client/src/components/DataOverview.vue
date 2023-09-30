<script setup lang="ts">
import DataOverviewItem from '@/components/DataOverviewItem.vue'
import Number from '@/components/Number.vue'
import Icon from '@/components/Icon.vue'

const rating = {
  votesCount: '9k',
  rating: 4.5,
  averageRating: '★★★★☆',
}

const award = {
  name: 'Best of 2021',
  section: 'Family',
}

const chart = {
  place: 1,
  category: 'Family Hotels',
}
</script>

<template>
  <div class="data-table">
    <DataOverviewItem
      :title="`${rating.votesCount} ratings`"
    >
      <template #content>
        <Number>
          {{ rating.rating }}
        </Number>
      </template>

      <template #footer>
        {{ rating.averageRating }}
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
        <Number label="No.">
          {{ chart.place }}
        </Number>
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
      fill: var(--color-hint);
    }
  }
}
</style>
