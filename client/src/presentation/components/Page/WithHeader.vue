<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useTelegram } from '@/application/services'

const { headerColor, setHeaderColor, colorScheme, platform} = useTelegram()

const header = ref<HTMLDivElement | null>(null)
const headerHeight = ref(59)

/**
 * In the last Telegram iOS client, some theme variable are broken in Dark mode:
 * --tg-theme-bg-color and --tg-theme-secondary-bg-color became swapped.
 * And app header color is black instead of gray.
 *
 * As a temporary workaround, we manually swap them back.
 * Also, we change header color to gray to match fixed header color.
 */
const previousHeaderColor = ref<string | undefined>(undefined)

onMounted(() => {
  if (header.value === null) {
    return
  }

  headerHeight.value = header.value.clientHeight

  if (platform === 'ios' && colorScheme === 'dark' && headerColor === '#000000') {
    previousHeaderColor.value = headerColor
    setHeaderColor('secondary_bg_color')
  }
})

onBeforeUnmount(() => {
  if (previousHeaderColor.value !== undefined) {
    setHeaderColor(previousHeaderColor.value as `#${string}`)
  }
})
</script>
<template>
  <Teleport to=".app-header">
    <div
      ref="header"
      class="page-header"
    >
      <slot name="header" />
    </div>
  </Teleport>
  <div class="page">
    <div class="page-content">
      <slot name="content" />
    </div>
  </div>
</template>


<style scoped>
.page {
}
.page-header {
  background-color: var(--color-bg);
  animation: header-in 200ms ease;
}

@keyframes header-in {
  from {
    transform: translateY(-100%);
  }
}

.page-content {
  padding-top: v-bind('headerHeight + "px"');
}
</style>
