<script setup lang="ts">
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'

defineProps<{
  /**
   * Picture src
   */
  avatar?: {
    id?: number;
    src?: string;
    placeholder?: string;
  };
  icon?: string;
  label?: string;
  subtitle?: string;
  withArrow?: boolean;
  standalone?: boolean;
}>()
</script>

<template>
  <div
    class="list-item"
    :class="{
      'list-item--standalone': standalone
    }"
  >
    <div class="left-row">
      <Avatar
        v-if="avatar"
        :id="avatar.id"
        :src="avatar.src"
        :placeholder="avatar.placeholder"
      />
      <Avatar
        v-else-if="icon"
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
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.list-item {
  display: grid;
  grid-template-columns: 50px auto;
  align-items: center;
  padding-left: 16px;

  &--standalone {
    background-color: var(--color-bg);
    border-radius: 14px;
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
