<script setup lang="ts">
import { nextTick, onBeforeMount, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useLayout, useScroll, useTelegram, useThumbnail } from '@/application/services'
import { getCSSVariable } from '@/infra/utils/dom'

const props = defineProps<{
  /**
   * Name of the card
   */
  title: string;

  /**
   * Picture src
   */
  picture: string;

  /**
   * Small thumb of the picture in base64
   */
  pictureThumb: string;
}>()

const { appWidth } = useLayout()
const { lock: lockScroll, unlock: unlockScroll } = useScroll()
const { getViewportHeight, showBackButton, hideBackButton } = useTelegram()

/**
 * Whether the card is expanded
 */
const expanded = ref(false)
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
const heightCollapsed = ref('460px')

/**
 * Whether the card is currently animating
 */
const isAnimating = ref(false)

/**
 * We store thumbnail here first, then when picture is loaded, we put its data here
 */
const { pictureUrl, isPictureLoaded } = useThumbnail(props.picture, props.pictureThumb)

/**
 * Begin expand animation
 */
function expand(): void {
  reserveSpace()
  expanded.value = true
}

/**
 * Begin collapse animation
 */
function collapse(): void {
  freeSpace()
  expanded.value = false
}

/**
 * Click listener: expands a card
 */
function cardClicked(): void {
  /**
   * Prevent double click when animation is not finished yet
   */
  if (isAnimating.value) {
    return
  }

  onBeforeAnimation()

  if (!expanded.value) {
    expand()
  } else {
    collapse()
  }
}

/**
 * Hook called before animation starts
 */
function onBeforeAnimation(): void {
  console.trace('onBeforeAnimation')
  isAnimating.value = true
  document.body.style.userSelect = 'none'
  document.body.style.webkitUserSelect = 'none'
  document.body.style.pointerEvents = 'none'
}

/**
 * Hook called when animation is finished
 */
function onAnimationEnd(): void {
  isAnimating.value = false
  document.body.style.userSelect = 'unset'
  document.body.style.webkitUserSelect = 'unset'
  document.body.style.pointerEvents = 'unset'
}

/**
 * Saves the space of card then it gets expanded
 */
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
      left: getCSSVariable('--size-cell-h-margin', document.body) ?? 16 + 'px',
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
        height: '100vh',
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

function onCollapsed(): void {
  setContentWidth('unset')

  if (card.value === null) {
    return
  }
  card.value.style.position = 'unset'
  card.value.style.top = 'unset'
  card.value.style.left = 'unset'
  card.value.style.height = heightCollapsed.value
  card.value.style.width = 'unset'
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
    onCollapsed()
  }, { once: true })
}

/**
 * Block base layer scroll when card is expanded
 */
watch(expanded, (isExpanded) => {
  if (isExpanded) {
    lockScroll()
    showBackButton(() => {
      collapse()
    })
  } else {
    unlockScroll()
    hideBackButton()
  }
})

onMounted(() => {
  card.value?.addEventListener('transitionend', onAnimationEnd)
})

onBeforeMount(() => {
  const viewportHeight = getViewportHeight()

  if (viewportHeight !== undefined && viewportHeight < 600) {
    heightCollapsed.value = '300px'
  }
})

onBeforeUnmount(() => {
  card.value?.removeEventListener('transitionend', onAnimationEnd)
  expanded.value = false
  onAnimationEnd()
  unlockScroll()
  hideBackButton()

  /**
   * #todo handle card clicked here
   */
})
</script>
<template>
  <div
    class="list-card-wrapper"
    :style="{
      pointerEvents: isAnimating ? 'none' : 'auto',
    }"
  >
    <div
      ref="card"
      class="list-card"
      :class="{ expanded }"
    >
      <div
        class="picture-container"
        :style="{
          backgroundImage: `url(${pictureUrl})`
        }"
        @click="cardClicked"
      >
        <div
          v-show="!isPictureLoaded"
          class="picture-container__loader"
        />
        <div class="picture-container__footer">
          <div class="title">
            {{ title }}
          </div>
          <slot name="visible" />
        </div>
      </div>
      <div
        ref="content"
        class="content"
      >
        <slot name="collapsed" />
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
  will-change: border-radius, left, top, height, width, box-shadow;
  user-select: none;

  @apply --safari-overflow-hidden-fix;
  transform: translateZ(0);

  .picture-container {
    position: relative;
    overflow: hidden;
    height: var(--height);
    max-width: 100%;
    width: 100%;
    background-color: var(--color-bg-secondary);
    background-size: cover;
    background-position: center center;

    &__loader {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      backdrop-filter: blur(20px);
    }

    &__footer {
      position: absolute;
      bottom: 0;
      left: 0;

      /**
      * Fix for Safari z-index problem
      */
      /* -webkit-transform: translate3d(0,0,0); */

      &:deep(.list-item) {
        backdrop-filter: blur(20px);
        padding: 8px 0 8px var(--size-cell-h-padding);
      }

      &:deep(.list-item .title),
      &:deep(.list-item .right > *),
      &:deep(.list-item .subtitle),
      &:deep(.list-item .right) {
        color: var(--color-text-button);
      }
    }
  }

  .title {
    padding: 24px;
    font-size: var(--text-lg);
    font-weight: var(--weight-bold);
    text-transform: uppercase;
    font-weight: 800;
    font-size: 42px;
    max-width: 30%;
    line-height: 0.9em;
    color: #fff;
  }

  .content {
    opacity: 0;
    transition: opacity var(--speed) 300ms ease;

    @apply --body;
  }

  &.expanded {
    border-radius: 0;
    overflow: auto;
  }

  &.expanded .content {
    opacity: 1;
  }
}
</style>
