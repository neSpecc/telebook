<script setup lang="ts">
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

const props = defineProps<{
  /**
   * Picture src
   */
  avatar?: {
    id?: number;
    src?: string;
    placeholder?: string;
  };
  transactionIcon?: string;
  icon?: string;
  title?: string;
  label?: string;
  subtitle?: string;
  rightIcon?: string;
  rightIconLabel?: string;
  standalone?: boolean;
  to?: string;
  bigAvatar?: boolean;
}>()

// /**
//  * Determines if the left column should be rendered
//  */
// const hasLeftCol = computed(() => {
//   return props.avatar !== undefined || props.transactionIcon !== undefined || props.icon !== undefined
// })
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    class="list-item"
    :class="{
      'list-item--standalone': standalone,
      'list-item--big-avatar': bigAvatar
    }"
    :to="to"
  >
    <div
      class="left-col"
    >
      <slot name="picture" />
      <Avatar
        v-if="avatar"
        :id="avatar.id"
        :src="avatar.src"
        :placeholder="avatar.placeholder"
        :big="bigAvatar"
      />
      <Avatar
        v-else-if="transactionIcon || icon"
        :transaction-icon="transactionIcon"
        :icon="icon"
      />
    </div>
    <div class="right-row">
      <div class="body">
        <div
          v-if="title"
          class="title"
        >
          {{ title }}
        </div>
        <div
          v-if="label"
          class="label"
        >
          {{ label }}
        </div>
        <div
          v-if="subtitle"
          class="subtitle"
        >
          {{ subtitle }}
        </div>
      </div>
      <div
        v-if="rightIcon !== undefined || $slots.right"
        class="right"
      >
        <slot name="right" />

        <span
          v-if="rightIconLabel !== undefined"
          class="right-icon-label"
        >
          London
        </span>

        <Icon
          v-if="rightIcon !== undefined"
          :name="rightIcon"
        />
      </div>
    </div>
  </component>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.list-item {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
  padding-left: var(--size-cell-h-padding);
  min-height: 44px;

  &:active {
    /**
     * Make background color darker when pressed using filter
     */
    filter: brightness(0.9);
  }

  &--standalone {
    background-color: var(--color-bg);
    border-radius: var(--size-border-radius-big);
    padding-block: 2px;
  }

  .left-col {
    display: grid;
    align-items: center;

    & > :deep(*) {
      margin-right: 15px;
    }
  }

  &--big-avatar .left-col {
    align-items: start;
  }

  &--big-avatar .left-col {
    padding-block: 14px;
  }

  .right-row {
    display: grid;

    /**
     * First and second column should stretched to the parent height, then should be a separator line
     */
    grid-template-columns: 1fr auto;
    grid-template-rows: auto var(--size-separator-height);

    &::after {
      content: '';
      height: var(--size-separator-height);
      background-color: var(--separator-color);
      display: block;
      grid-column: 1 / -1;
    }

    .right {
      padding-inline-end: var(--size-cell-h-padding);
      display: grid;
      align-content: center;
      grid-auto-flow: column;
      align-items: center;
      gap: 4px;

      .icon {
        stroke: var(--color-hint);
        display: inline-flex;
        justify-content: center;
      }
    }
  }

  &--standalone .right-row::after {
    display: none;
  }

  &:last-of-type .right-row::after {
    display: none;
  }

  .body {
    padding: 10px 0;
    padding-inline-end: 16px;

    display: grid;
    align-content: center;
  }

  .label {
    color: var(--color-text);

    @apply --body-compact-medium;
  }

  .title {
    @apply --headline;
  }

  .subtitle {
    color: var(--color-hint);

    @apply --subheadline-2;

    /** 3 lines max */
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.right-icon-label {
  display: inline-flex;
  margin-right: 6px;
  color: var(--color-hint);
  @apply --headline;
}
</style>
