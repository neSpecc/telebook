<script setup lang="ts">
import List from '@/presentation/components/List.vue'
import ListItem from '@/presentation/components/ListItem.vue'
import Sections from '@/presentation/components/Sections.vue'
import Section from '@/presentation/components/Section.vue'
</script>
<template>
  <div>
    <Sections>
      <Section
        with-background
        standalone
      >
        <List gapped>
          <ListItem
            :id="1"
            icon="settings-user"
            label="Select service"
            to="services"
            with-arrow
          />
          <ListItem
            :id="1"
            icon="settings-faq"
            label="FAQ"
            to="services"
            with-arrow
          />
        </List>
      </Section>
    </Sections>
  </div>
</template>

<style scoped>

</style>
