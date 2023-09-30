<script setup lang="ts">
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import Sections from '@/components/Sections.vue'
import Section from '@/components/Section.vue'
import SectionTitle from '@/components/SectionTitle.vue'
</script>
<template>
  <div>
    <Sections>
      <Section with-background standalone="">
        <List>
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
