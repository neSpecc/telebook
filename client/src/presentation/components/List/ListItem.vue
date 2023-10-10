<script setup lang="ts">
import type EntityPicture from '@/domain/entities/EntityPicture'
import { Avatar, Icon, ListItemIcon } from '@/presentation/components'
import { computed, useSlots } from 'vue'

const props = defineProps<{
  /**
   * List item picture data
   */
  avatar?: EntityPicture;

  /**
   * Name of the icon that will be shown instead of avatar
   */
  transactionIcon?: string;

  /**
   * Name of the icon that will be shown instead of avatar
   */
  icon?: string;

  /**
   * Title of the list item (used along with subtitle)
   */
  title?: string;

  /**
   * Subtitle of the list item
   */
  subtitle?: string;

  /**
   * Label of the list item
   */
  label?: string;

  /**
   * Name of the icon that will be shown on the right side of the list item
   */
  rightIcon?: string;

  /**
   * Label of the right icon
   */
  rightIconLabel?: string;

  /**
   * Whether to display list item as a standalone island
   */
  standalone?: boolean;

  /**
   * Router link
   */
  to?: string;

  /**
   * Whether to display avatar as a big one
   */
  bigAvatar?: boolean;

  /**
   * Whether to display subtitle in one line
   */
  nowrap?: boolean;
}>()

const slots = useSlots()

/**
 * Determines whether the left column should be rendered
 */
const hasPicture = computed(() => {
  return slots.picture !== undefined || props.avatar !== undefined || props.transactionIcon !== undefined || props.icon !== undefined
})

/**
 * Determines what size of the picture should be used
 * - small - 28px
 * - medium - 40px
 * - big - 76px
 */
const pictureSize = computed(() => {
  if (props.bigAvatar) {
    return 'big'
  }

  if (props.transactionIcon !== undefined) {
    return 'medium'
  }

  if (props.icon !== undefined) {
    return 'small'
  }

  if (slots.picture !== undefined) {
    return 'medium'
  }

  return undefined
})

/**
 * Rounding style of a picture: square or circle
 */
const pictureStyle = computed(() => {
  if (!hasPicture.value) {
    return undefined
  }

  if (props.avatar !== undefined) {
    return 'square'
  }

  if (props.transactionIcon !== undefined) {
    return 'circle'
  }

  if (props.icon !== undefined) {
    return 'square'
  }

  return 'circle'
})
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    class="list-item"
    :class="{
      'list-item--standalone': standalone,
      'list-item--big-avatar': bigAvatar,
      'list-item--nowrap': nowrap,
    }"
    :to="to"
  >
    <div
      class="left-col"
    >
      <slot name="picture" />
      <Avatar
        v-if="avatar"
        v-bind="avatar"
        :big="bigAvatar"
      />
      <ListItemIcon
        v-else-if="transactionIcon"
        :icon="transactionIcon"
        type="circle"
      />
      <ListItemIcon
        v-else-if="icon"
        :icon="icon"
        type="square"
      />
    </div>
    <div class="right-row">
      <div class="body">
        <div
          v-if="label"
          class="label"
        >
          {{ label }}
        </div>
        <div
          v-if="title"
          class="title"
        >
          {{ title }}
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
          {{ rightIconLabel }}
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
@import '@/presentation/styles/theme/typescale.css';
.list-item {
  --color-arrow: var(--color-hint);

  display: grid;
  grid-template-columns: auto 1fr;
  align-items: stretch;
  padding-left: var(--size-cell-h-padding);
  min-height: var(--size-cell-min-height);

  /**
   * Disable default link touch feedback
   */
  -webkit-tap-highlight-color: transparent;

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
    padding-block: 10px;
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
        stroke: var(--color-arrow);
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
    @apply --headline;
  }

  .title {
    @apply --body-compact-medium;
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

  &--nowrap .subtitle {
    -webkit-line-clamp: 1;
  }
}

.is-material .list-item {
  --color-arrow: var(--separator-color);

  &--standalone {
    box-shadow: 0 0 0 1px var(--color-island-shadow);
  }

  .body {
    grid-gap: 2px;
  }
}

.right-icon-label {
  display: inline-flex;
  margin-right: 6px;
  color: var(--color-hint);
  @apply --headline;
}
</style>
