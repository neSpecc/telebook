<script setup lang="ts">
import Placeholder from '@/presentation/components/Placeholder.vue'
import List from '@/presentation/components/List.vue'
import ListItem from '@/presentation/components/ListItem.vue'
import ListItemExpandable from '@/presentation/components/ListItemExpandable.vue'
import Sections from '@/presentation/components/Sections.vue'
import Section from '@/presentation/components/Section.vue'
import SectionTitle from '@/presentation/components/SectionTitle.vue'
import ListCards from '@/presentation/components/ListCards.vue'
import ListCard from '@/presentation/components/ListCard.vue'
import DatePicker from '@/presentation/components/DatePicker.vue'
import DatePickerCompact from '@/presentation/components/DatePickerCompact.vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { useTripDetails } from '@/domain/services/useTripDetails'

import WebApp from '@twa-dev/sdk'

const { location, selectDefault: selectDefaultLocation } = useTripDetails()

/**
 * Whether to show the start date picker
 */
const startDatePickerShowed = ref(false)

/**
 * Whether to show the end date picker
 */
const endDatePickerShowed = ref(false)

onMounted(() => {
  selectDefaultLocation()
})

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
    >
      <template #picture>
        <img
          src="/issuegram.svg"
          aria-hidden="true"
          width="68"
        >
      </template>
    </Placeholder>
    <Sections>
      <Section
        with-background
        standalone
      >
        <List>
          <ListItem title="Travel date">
            <template #right>
              <DatePickerCompact
                @click="startDatePickerShowed = !startDatePickerShowed; endDatePickerShowed = false"
              />
            </template>
          </ListItem>
          <ListItemExpandable :opened="startDatePickerShowed">
            <DatePicker />
          </ListItemExpandable>
          <ListItem title="End date">
            <template #right>
              <DatePickerCompact
                @click="endDatePickerShowed = !endDatePickerShowed; startDatePickerShowed = false"
              />
            </template>
          </ListItem>
          <ListItemExpandable :opened="endDatePickerShowed">
            <DatePicker />
          </ListItemExpandable>
          <ListItem
            title="Location"
            right-icon="chevron-right"
            :right-icon-label="location?.title"
            to="/location"
          />
        </List>
      </Section>
      <!-- <Section padded>
        <DatePicker />
      </Section> -->
      <Section padded>
        <List gapped>
          <ListItem
            :id="1"
            transaction-icon="market-fill"
            label="Select service"
            subtitle="The service you want to use"
            to="services"
            right-icon="chevron-right"
            standalone
          />
          <ListItem
            :id="2"
            transaction-icon="user-circle-fill"
            label="Select provider"
            subtitle="If you prefer a particular profi"
            right-icon="chevron-right"
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
              Compfortable hotel with a beautiful view to the sea. The hotel has a restaurant, a bar, a swimming pool, a gym and a spa.
              <List gapped>
                <ListItem
                  :id="1"
                  transaction-icon="clock-fill"
                  label="Check rooms"
                  subtitle="There are 14 rooms available"
                  to="/rooms/1"
                  right-icon="chevron-right"
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
        standalone
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
@/application/services/example/useTripDetails
@/domain/services/useTripDetails
