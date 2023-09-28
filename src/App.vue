<script setup lang="ts">
import Placeholder from './components/Placeholder.vue'
</script>

<template>
  <div class="app">
    <Placeholder
      image="/issuegram.svg"
      title="Issuegram"
      caption="A simple issue tracker"
      link-text="Start exploring"
    />
  </div>
</template>

<style>
:root {
  color-scheme: light dark;
  background-color: #000;
}

body {
  margin: 0;
  display: flex;
  min-width: 320px;
  min-height: 100vh;
}

#app {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 1fr;
  min-height: 100%;
  width: 100%;
  font-family: system-ui, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  @media (min-width: 768px) {
    max-width: 390px;
  }
}

.app {
  background-color: var(--color-bg);
  color: var(--color-text);
}
</style>
