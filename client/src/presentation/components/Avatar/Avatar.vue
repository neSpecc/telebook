<script setup lang="ts">
import { computed } from 'vue'
import { useThumbnail } from '@/application/services'
import type EntityPicture from '@/domain/entities/EntityPicture'

/**
 * Available props of the avatar component
 */
interface AvatarProps extends EntityPicture {
  /**
   * Whether the avatar should be big
   */
  big?: boolean;
}

/**
 * Props to be passed to the component
 */
const props = defineProps<AvatarProps>()

const { pictureUrl, isPictureLoaded } = props.src !== undefined && props.pictureThumb !== undefined
  ? useThumbnail(props.src, props.pictureThumb)
  : { pictureUrl: undefined, isPictureLoaded: undefined }

/**
 * Colors for placeholder background gradient
 */
const bgColors = [
  ['#e17076', '#ff885e', '#ff516a'],
  ['#faa774', '#ffcd6a', '#ffa85c'],
  ['#a695e7', '#82b1ff', '#665fff'],
  ['#7bc862', '#a0de7e', '#54cb68'],
  ['#6ec9cb', '#53edd6', '#28c9b7'],
  ['#65aadd', '#72d5fd', '#2a9ef1'],
  ['#ee7aae', '#e0a2f3', '#d669ed'],
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
      'avatar--with-placeholder': !src,
      'avatar--big': big === true,
    }"
    :style="{
      backgroundImage: backgroundColor
    }"
  >
    <img
      v-if="src"
      :src="pictureThumb ? pictureUrl : src"
      :alt="placeholder ?? ''"
    >
    <div
      v-else
      class="placeholder"
    >
      {{ abbreviation }}
    </div>
    <div
      v-show="pictureThumb && !isPictureLoaded"
      class="loader"
    />
  </div>
</template>

<style scoped lang="postcss">
@import '@/presentation/styles/theme/typescale.css';
.avatar {
  --size: var(--size-avatar-medium);
  --radius: 50%;

  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: var(--size);
  height: var(--size);
  border-radius: var(--radius);

  &--big {
    --size: var(--size-avatar-big);
    --radius: var(--size-border-radius-medium);
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--radius);
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

  .loader {
    position: absolute;
    width: var(--size);
    height: var(--size);
    border-radius: var(--radius);
    backdrop-filter: blur(20px);
  }
}
</style>
