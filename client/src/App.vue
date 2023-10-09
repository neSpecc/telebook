<script setup lang="ts">
import { onBeforeMount, onErrorCaptured } from 'vue'
import { useTelegram } from '@/application/services'

const { colorScheme } = useTelegram()

/**
 * Hook will be called when next screen just added to the DOM
 * We use it to scroll to the top of the page
 */
function onBeforeSegue(): void {
  requestAnimationFrame(() => {
    window.scrollTo(0, 0)
  })
}

onErrorCaptured((error: Error) => {
  console.error(error)
})

onBeforeMount(() => {
  if (colorScheme !== undefined) {
    document.body.classList.add(colorScheme)
  }
})
</script>

<template>
  <div class="app">
    <div class="app-header"></div><!--Teleport location for PageWithHeader component-->
    <RouterView v-slot="{ Component }">
      <transition
        name="default-segue"
        @before-enter="onBeforeSegue"
      >
        <component
          :is="Component"
        />
      </transition>
    </RouterView>
  </div>
</template>

<style>
@import '@/presentation/styles/theme/typescale.css';

:root {
  color-scheme: light dark;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
  background-color: var(--color-bg-secondary);
}

#app {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr;
  min-height: 100%;
  width: 100%;
  font-family: var(--family);

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  @media (min-width: 460px) {
    max-width: 390px;
    margin: 0 auto;
  }
}

.app {
  color: var(--color-text);
  position: relative;
}

.app-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.default-segue-leave-active {
  visibility: hidden;
  height: 0;
  overflow: hidden;
}

.default-segue-enter-active {
  transition: opacity 500ms ease;
  will-change: opacity;
}

.default-segue-enter-from,
.default-segue-leave-to {
  opacity: 0;
}
</style>
