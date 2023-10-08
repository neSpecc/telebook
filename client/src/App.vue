<script setup lang="ts">
import { onBeforeMount, onErrorCaptured } from 'vue'
import { useTelegram } from '@/application/services'

const { colorScheme } = useTelegram()

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
    <RouterView v-slot="{ Component, route }">
      <transition :name="route.meta.transition ?? ''">
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* .slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 30s ease, opacity 30s ease;
}

.slide-left-enter-from {
  transform: translateX(40px);
  opacity: 0;
}

.slide-left-leave-to {
  opacity: 0;
} */

.slide-left-enter-active {
  animation: slide-left 200ms;
  will-change: transform, opacity;
}

@keyframes slide-left {
  from {
    transform: translateX(40px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
