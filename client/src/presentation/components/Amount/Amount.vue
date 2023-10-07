<script setup lang="ts">
defineProps<{
  /**
   * Will be placed at top-left corner near the number
   */
  prefix?: string;
}>()
</script>

<template>
  <div class="amount">
    <div
      v-if="$slots.topline"
      class="topline"
    >
      <slot name="topline" />
    </div>

    <span class="digit">
      <span
        v-if="prefix"
        class="prefix"
      >
        {{ prefix }}
      </span>
      <slot />
      <span
        v-if="$slots.postfix"
        class="postfix"
      >
        <slot name="postfix" />
      </span>
    </span>

    <div
      v-if="$slots.subline"
      class="subline"
    >
      <slot name="subline" />
    </div>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';
.amount {
  display: grid;
  grid-auto-rows: min-content;
  gap: 3px;
}

.digit {
  @apply --title-3-rounded-semibold;

  white-space: nowrap;
}

.subline,
.topline {
  @apply --caption-1;

  color: var(--color-text-secondary);
  color: var(--color-hint);
}

.prefix {
  @apply --footnote-rounded-semibold;

  color: var(--color-hint);
  vertical-align: text-top;
  line-height: 24px;
}

.postfix {
  @apply --footnote-rounded-semibold;

  color: var(--color-hint);
  vertical-align: middle;
}
</style>
