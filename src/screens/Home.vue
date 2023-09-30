<script setup lang="ts">
import Placeholder from '@/components/Placeholder.vue'
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import Sections from '@/components/Sections.vue'
import Section from '@/components/Section.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ListCards from '@/components/ListCards.vue'
import ListCard from '@/components/ListCard.vue'
import { onUnmounted } from 'vue'
import WebApp from '@twa-dev/sdk'

onUnmounted(() => {
  WebApp.BackButton.show()
})
</script>
<template>
  <div>
    <Placeholder
      image="/issuegram.svg"
      title="Telebook"
      caption="Book a profi appointment"
      link-text="Start exploring"
    />
    <Sections>
      <Section padded>
        <List>
          <ListItem
            :id="1"
            transaction-icon="market-fill"
            label="Select service"
            subtitle="The service you want to use"
            to="services"
            with-arrow
            standalone
          />
          <ListItem
            :id="2"
            transaction-icon="user-circle-fill"
            label="Select provider"
            subtitle="If you prefer a particular profi"
            with-arrow
            standalone
          />
        </List>
      </Section>

      <Section padded>
        <ListCards>
          <ListCard
            title="Sunset Beach Hotel"
            picture="/pics/hotel-1.jpg"
          >
            <Sections>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea nobis exercitationem reprehenderit quam corrupti, ipsa sunt ex alias dolor nisi et animi quo recusandae, possimus rerum vel. Expedita, nulla architecto.
              <List>
                <ListItem
                  :id="1"
                  transaction-icon="clock-fill"
                  label="Check rooms"
                  subtitle="There are 14 rooms available"
                  to="services"
                  with-arrow
                  standalone
                />
              </List>
            </Sections>
          </ListCard>
          <ListCard
            title="Swan Lake"
            picture="/pics/hotel-2.jpg"
          >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea nobis exercitationem reprehenderit quam corrupti, ipsa sunt ex alias dolor nisi et animi quo recusandae, possimus rerum vel. Expedita, nulla architecto.
          </ListCard>
        </ListCards>
      </Section>

      <Section
        with-background
        padded
      >
        <SectionTitle>
          History
        </SectionTitle>

        <ListItem
          :id="1"
          :avatar="{src: 'https://i.pravatar.cc/100', placeholder: 'Ca'}"
          label="Sochet Apartments"
          subtitle="Aug 20 • California"
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
          :avatar="{placeholder: 'Sal Dal', src: 'https://i.pravatar.cc/110'}"
          label="Salvador Dali"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="6"
          :avatar="{placeholder: 'Editor.js'}"
          label="Editor.js"
          subtitle="A simple issue tracker"
        />
        <ListItem
          :id="1"
          :avatar="{src: 'https://i.pravatar.cc/100', placeholder: 'Sal Dal'}"
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
          :avatar="{placeholder: 'Sal Dal', src: 'https://i.pravatar.cc/110'}"
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

<style scoped>

</style>
