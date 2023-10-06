<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useLayout } from '@/application/services/useLayout'
import { useScroll } from '@/application/services/useScroll'

defineProps<{
  /**
   * Name of the card
   */
  title: string;

  /**
   * Picture src
   */
  picture: string;
}>()

const { appWidth } = useLayout()
const { lock: lockScroll, unlock: unlockScroll } = useScroll()

/**
 * Whether the card is expanded
 */
const expanded = ref(false)

/**
 * Click listener: expands a card
 */
function cardClicked(): void {
  if (!expanded.value) {
    reserveSpace()
    expanded.value = true
  } else {
    freeSpace()
    expanded.value = false
  }
}

/**
 * The card element
 */
const card = ref<HTMLDivElement | null>(null)

/**
 * The content below the picture element
 */
const content = ref<HTMLDivElement | null>(null)

/**
 * Card height when collapsed
 */
const heightCollapsed = '460px'

const beforeTransition = ref({
  top: '0',
  left: '0',
  width: '0',
  height: '0',
})
/**
 * Saves the space of card then it gets expanded
 */
function reserveSpace(): void {
  if (card.value === null) {
    return
  }

  const cardRect = card.value.getBoundingClientRect()

  void nextTick(() => {
    card.value!.style.position = 'fixed'

    /**
     * Fixe the width of content to prevent it from jumping when card gets expanded
     */
    setContentWidth(`${appWidth.value}px`)

    beforeTransition.value = {
      /**
       * Actual element top from the top of the viewport including scroll
       */
      top: `${cardRect.top + window.scrollY}px`,
      /**
       * Horizontal margins around
       */
      left: `${16}px`,
      width: `${cardRect.width}px`,
      height: `${cardRect.height}px`,
    }

    fixCard(beforeTransition.value)

    // eslint-disable-next-line clean-timer/assign-timer-id
    setTimeout(() => {
      /**
       * pin to scrolled top
       */
      fixCard({
        top: `${window.scrollY}px`,
        left: '0',
        width: '100%',
        height: '100%',
      })
    }, 10)
  })
}

/**
 * Fixes the width of content to prevent it from jumping when card gets expanded
 *
 * @param value - pass width to fix and "unset" to reset
 */
function setContentWidth(value: string): void {
  if (content.value === null) {
    return
  }

  content.value.style.width = value
}

/**
 * Fixes the card position
 *
 * @param top - top position
 * @param left - left position
 * @param height - height
 * @param width - width
 */
function fixCard({ top, left, height, width }: { top: string; left: string; height: string; width: string }): void {
  if (card.value === null) {
    return
  }

  card.value.style.top = top
  card.value.style.left = left
  card.value.style.height = height
  card.value.style.width = width
}

/**
 * Free the space of card then it gets collapsed
 */
function freeSpace(): void {
  if (card.value === null) {
    return
  }

  fixCard(beforeTransition.value)

  card.value.addEventListener('transitionend', () => {
    setContentWidth('unset')
    card.value!.style.position = 'unset'
    card.value!.style.top = 'unset'
    card.value!.style.left = 'unset'
    card.value!.style.height = heightCollapsed
    card.value!.style.width = 'unset'
  }, { once: true })
}

/**
 * Block base layer scroll when card is expanded
 */
watch(expanded, (expanded) => {
  if (expanded) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

onBeforeUnmount(() => {
  unlockScroll()
})
</script>
<template>
  <div
    class="list-card-wrapper"
  >
    <div
      ref="card"
      class="list-card"
      :class="{ expanded }"
      @click="cardClicked"
    >
      <div class="picture-container">
        <img
          class="picture"
          :src="picture"
        >
        <div class="title">
          {{ title }}
        </div>
      </div>
      <div
        ref="content"
        class="content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';
@import '@/presentation/styles/hacks.css';

.list-card-wrapper {
  height: v-bind(heightCollapsed);
}
.list-card  {
  --height: v-bind(heightCollapsed);
  --speed: 680ms;
  --timing: cubic-bezier(.58,-0.5,.4,1.17);

  background-color: var(--color-bg-secondary);
  border-radius: var(--size-border-radius-big);
  overflow: hidden;
  transition:
    border-radius var(--speed) ease,
    left var(--speed) var(--timing),
    top var(--speed) var(--timing),
    height var(--speed) ease,
    width var(--speed) var(--timing),
    box-shadow 200ms ease-out;

  height: var(--height);
  z-index: 9;
  will-change: border-radius, left, top, height, width;
  /* box-shadow: 0 0 10px rgba(0,0,0,0.2), 0 3px 20px -5px rgba(0,0,0,0.14); */
  /* box-shadow: 0 0 24px -10px rgba(0,0,0,0.74); */

  @apply --safari-overflow-hidden-fix;
  transform: translateZ(0);

  .picture-container {
    position: relative;
    overflow: hidden;
    height: var(--height);
    max-width: 100%;
    width: 100%;
  }

  .picture {
    height: 100%;
    transform: scale(1.1);
    vertical-align: bottom;
    will-change: transform;
    transition: transform var(--speed) ease;
    position: absolute;
  }

  .title {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 24px;
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    text-transform: uppercase;
    font-weight: 800;
    font-size: 46px;
    max-width: 30%;
    line-height: 0.86em;
    color: #fff;

    /**
     * Fix for Safari z-index problem
     */
    -webkit-transform: translate3d(0,0,0);
  }

  .content {
    opacity: 0;
    transition: opacity var(--speed) 300ms ease;
    padding: 16px;

    @apply --body;
  }

  &.expanded {
    border-radius: 0;

    .picture {
      transform: scale(1);
    }
  }

  &.expanded .content {
    opacity: 1;
  }
}
</style>
