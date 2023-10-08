<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  /**
   * Whether the list item should be opened
   */
  opened?: boolean;
}>(), {
  opened: false,
})

/**
 * Reference to the expandable element
 */
const expandableEl = ref<HTMLElement | null>(null)

/**
 * We will calculate max height of the expandable element instead of hardcoding it
 */
const maxHeight = ref(0)

watch(() => props.opened, (opened) => {
  if (opened) {
    if (expandableEl.value?.scrollHeight === undefined) {
      return
    }

    maxHeight.value = expandableEl.value?.scrollHeight
  } else {
    maxHeight.value = 0
  }
})
</script>

<template>
  <div
    ref="expandableEl"
    class="list-item-expandable"
    :class="{
      'list-item-expandable--opened': opened,
    }"
  >
    <slot />
  </div>
</template>

<style scoped lang="postcss">
@import '@/presentation/styles/theme/typescale.css';
.list-item-expandable {
  --animation-speed: 500ms;

  display: grid;
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--animation-speed) cubic-bezier(.28,.9,.57,1.05);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 300px;
    width: 100%;
    /**
     * Vertical gradient
     */
    background-image: linear-gradient(to bottom, var(--color-bg-tertiary) 0%,transparent 100%);
    display: block;
    z-index: 0;
    opacity: 1;
    visibility: visible;
    will-change: opacity, visibility;
    transition: opacity var(--animation-speed) ease;
  }

  & > :deep(*) {
    z-index: 1;
  }

  &::after {
    content: '';
    height: var(--size-separator-height);
    margin-left: var(--size-cell-h-padding);
    background-color: var(--separator-color);
    display: block;
    grid-column: 1 / -1;
    visibility: hidden;
  }

  &--opened {
    max-height: v-bind('maxHeight + "px"');

    &::before {
      opacity: 0;
    }

    &::after {
      visibility: visible;
    }
  }
}
</style>
