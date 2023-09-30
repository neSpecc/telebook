<script setup lang="ts">
import { computed } from 'vue'
import Icon from './Icon.vue'

const props = defineProps<{
  /**
   * Entity ID
   *
   * @todo support string ids
   */
  id?: number;

  /**
   * Picture src
   */
  src?: string;

  /**
   * Used when the image is not available
   */
  placeholder?: string;

  transactionIcon?: string;
  icon?: string;
}>()

const bgColors = [
  ['#e17076', '#ff885e', '#ff516a'], // red
  ['#faa774', '#ffcd6a', '#ffa85c'], // orange
  ['#a695e7', '#82b1ff', '#665fff'], // purple
  ['#7bc862', '#a0de7e', '#54cb68'], // green
  ['#6ec9cb', '#53edd6', '#28c9b7'], // cyan
  ['#65aadd', '#72d5fd', '#2a9ef1'], // blue
  ['#ee7aae', '#e0a2f3', '#d669ed'], // pink
]

/**
 * Abbreviation of the placeholder
 */
const abbreviation = computed(() => {
  if (props.placeholder === undefined) {
    return ''
  }

  const [firstName = '', lastName = ''] = props.placeholder.split(' ')

  let result = ''

  if (firstName !== '') {
    result += firstName.charAt(0).toUpperCase()
  }

  if (lastName !== '') {
    result += lastName.charAt(0).toUpperCase()
  }

  return result
})

/**
 * Background color of the placeholder
 */
const backgroundColor = computed(() => {
  let [color, topColor, bottomColor] = bgColors[Math.floor(Math.random() * bgColors.length)]

  if (props.id !== undefined) {
    [color, topColor, bottomColor] = bgColors[props.id % 7]
  }

  return `linear-gradient(180deg, ${topColor} 0%, ${bottomColor} 100%)`
})
</script>

<template>
  <div
    class="avatar"
    :class="{
      'avatar--with-transaction-icon': transactionIcon,
      'avatar--with-icon': icon,
      'avatar--with-placeholder': !icon && !transactionIcon && !src
    }"
  >
    <Icon
      v-if="icon || transactionIcon"
      :name="icon || transactionIcon"
    />
    <img
      v-else-if="src"
      :src="src"
      :alt="placeholder ?? ''"
    >
    <div
      v-else
      class="placeholder"
    >
      {{ abbreviation }}
    </div>
  </div>
</template>

<style scoped lang="postcss">
@import '../styles/theme/typescale.css';
.avatar {
  --size: var(--size-avatar-medium);
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: var(--size);
  height: var(--size);
  border-radius: 50%;

  &--with-placeholder {
    background: v-bind(backgroundColor);
  }

  &--with-transaction-icon {
    background: linear-gradient(156.88deg, #00E7FF 14.96%, #007AFF 85.04%);
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .placeholder {
    font-family: var(--rounded-family);
    font-size: 18px;
    line-height: var(--size);
    font-weight: 700;
    font-feature-settings: 'tnum' on, 'lnum' on;
    transform: translateX(0.6px);
    color: #fff;
  }

  :deep(.icon) svg {
    fill: #fff;

    animation: jump-in 250ms ease;
  }
}

@keyframes jump-in {
  0% {
    transform: scale(0.8);
  }

  80% {
    transform: scale(1.05);
  }

  100% {
    transform: scale(1);
  }
}
</style>
