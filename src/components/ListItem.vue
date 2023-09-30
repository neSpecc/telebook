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
}>()
</script>

<template>
  <component
    :is="to ? 'router-link' : 'div'"
    class="list-item"
    :class="{
      'list-item--standalone': standalone
    }"
    :to="to"
  >
    <div class="left-row">
      <Avatar
        v-if="avatar"
        :id="avatar.id"
        :src="avatar.src"
        :placeholder="avatar.placeholder"
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
        v-if="withArrow"
        class="right"
      >
        <Icon name="chevron-right" />
      </div>
    </div>
  </component>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.list-item {
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
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

  .right-row {
    padding-right: 16px;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;

    &::after {
      content: '';
      height: 1px;
      background-color: var(--color-hint);
      display: block;
      opacity: 0.07;
    }

    .right {
      padding-left: 16px;

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
  }

  .label {
    color: var(--color-text);

    @apply --body-compact-medium;
  }

  .subtitle {
    color: var(--color-hint);

    @apply --subheadline-2;
  }
}
</style>
