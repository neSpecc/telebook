<script setup lang="ts">
import Placeholder from './components/Placeholder.vue'
import List from './components/List.vue'
import ListItem from './components/ListItem.vue'
import Sections from './components/Sections.vue'
import Section from './components/Section.vue'
import SectionTitle from './components/SectionTitle.vue'
</script>

<template>
  <div class="app">
    <Placeholder
      image="/issuegram.svg"
      title="Telebook"
      caption="Book a profi appointment"
      link-text="Start exploring"
    />

    <Sections>
      <Section>
        <List padded>
          <ListItem
            :id="1"
            icon="market-fill"
            label="Select service"
            subtitle="The service you want to use"
            with-arrow
            standalone
          />
          <ListItem
            :id="2"
            icon="user-circle-fill"
            label="Select provider"
            subtitle="If you prefer a particular profi"
            with-arrow
            standalone
          />
        </List>
      </Section>

      <Section with-background>
        <SectionTitle>
          History
        </SectionTitle>

        <ListItem
          :id="1"
          :avatar="{placeholder: 'Sal Dal'}"
          label="Salvador Dali"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="2"
          :avatar="{placeholder: 'Teleport'}"
          label="Teleport"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="3"
          :avatar="{placeholder: 'Issuegram'}"
          label="Issuegram"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="4"
          :avatar="{placeholder: 'CodeX Team'}"
          label="CodeX Team"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="5"
          :avatar="{placeholder: 'Sal Dal'}"
          label="Salvador Dali"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="6"
          :avatar="{placeholder: 'Editor.js'}"
          label="Editor.js"
          subtitle="A simple issue tracker"
        />
      </Section>
    </Sections>
  </div>
</template>

<style>
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
  font-family: system-ui, Inter, Avenir, Helvetica, Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;

  @media (min-width: 1268px) {
    max-width: 390px;
    margin: 0 auto;
  }
}

.app {

  color: var(--color-text);
}
</style>
