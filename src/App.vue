<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="/">
      <img src="/issuegram.svg" class="logo" alt="Issuegram logo" />
    </a>
  </div>
  <HelloWorld msg="Issuegram" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #0B8AFF);
}
</style>
