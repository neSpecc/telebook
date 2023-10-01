<script setup lang="ts">
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
  label?: string;
  subtitle?: string;
  withArrow?: boolean;
  standalone?: boolean;
  to?: string;
  bigAvatar?: boolean;
}>()
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
    <div class="left-row">
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
        <div class="label">
          {{ label }}
        </div>
        <div class="subtitle">
          {{ subtitle }}
        </div>
      </div>
      <div
        v-if="withArrow || $slots.right"
        class="right"
      >
        <Icon
          v-if="withArrow"
          name="chevron-right"
        />

        <slot name="right" />
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
  padding-left: 16px;

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

  .left-row {
    display: grid;
    padding-right: 15px;
    align-items: center;
  }

  &--big-avatar .left-row {
    align-items: start;
  }

  &--big-avatar .left-row {
    padding-block: 14px;
  }

  .right-row {
    display: grid;

    /**
     * First and second column should stretched to the parent height, then should be a separator line
     */
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 0.33px;

    &::after {
      content: '';
      height: 0.33px;
      background-color: var(--separator-color);
      display: block;
      grid-column: 1 / -1;
    }

    .right {
      padding-inline-end: 16px;
      display: grid;
      align-content: center;

      .icon {
        stroke: var(--color-hint);
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
</style>
