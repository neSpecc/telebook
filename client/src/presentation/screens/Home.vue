<script setup lang="ts">
import { Placeholder, List, ListItem, ListItemExpandable, Sections, Section, ListCard, DatePicker, DatePickerCompact, Number } from '@/presentation/components'
import { onMounted, onUnmounted, ref } from 'vue'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { hotels } from '@/infra/store/hotels/mock/hotels'

import WebApp from '@twa-dev/sdk'

const {
  trip,
  location,
  selectDefault: selectDefaultLocation,
  setStartDate,
  setEndDate,
} = useTripDetails()

/**
 * Whether to show the start date picker
 */
const startDatePickerShowed = ref(false)

/**
 * Whether to show the end date picker
 */
const endDatePickerShowed = ref(false)

onMounted(() => {
  if (trip.city === 0) {
    selectDefaultLocation()
  }
})

onUnmounted(() => {
  WebApp.BackButton.show()
})
</script>
<template>
  <div>
    <Placeholder
      title="Telebook"
      caption="Book a profi appointment"
    >
      <template #picture>
        <img
          src="/telebook.svg"
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
                :value="trip.startDate"
                @click="startDatePickerShowed = !startDatePickerShowed; endDatePickerShowed = false"
              />
            </template>
          </ListItem>
          <ListItemExpandable :opened="startDatePickerShowed">
            <DatePicker
              @date-pick="(date) => setStartDate(date)"
            />
          </ListItemExpandable>
          <ListItem title="End date">
            <template #right>
              <DatePickerCompact
                :value="trip.endDate"
                @click="endDatePickerShowed = !endDatePickerShowed; startDatePickerShowed = false"
              />
            </template>
          </ListItem>
          <ListItemExpandable :opened="endDatePickerShowed">
            <DatePicker
              @date-pick="(date) => setEndDate(date)"
            />
          </ListItemExpandable>
          <ListItem
            title="Location"
            right-icon="chevron-right"
            :right-icon-label="location?.title"
            to="/location"
          />
        </List>
      </Section>
      <Section padded>
        <List gapped>
          <ListItem
            v-for="hotel in hotels"
            :id="hotel.id"
            :key="hotel.id"
            :avatar="{src: '/pics/hotel-1.jpg', placeholder: hotel.title}"
            :label="hotel.title"
            :subtitle="hotel.subtitle"
            :to="`/hotel/${hotel.id}`"
            big-avatar
            standalone
          >
            <template #right>
              <div class="room-cell-right">
                <Number>
                  <template #topline>
                    from
                  </template>
                  {{ hotel.price }}$
                </Number>
                <div class="small">
                  for {{ 12 }} nights
                </div>
              </div>
              <!-- <div class="viewed">
                <span class="viewed-eyes">
                  👀
                </span>
                2 viewed
              </div> -->
            </template>
          </ListItem>
        </List>
      </Section>

      <Section padded>
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
                to="/hotel/1"
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
      </Section>

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
    </Sections>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.viewed {
  background-color: #000;
  font-size: 11px;
  border-radius: 13px;
  padding: 6px 7px;
  position: absolute;
  transform: translate(-24px, 72px);
  z-index: 9;
  white-space: nowrap;
  animation: fade-in 200ms ease;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.viewed-eyes {
  display: inline-block;
  animation: eye-blink 200ms ease;
  animation-delay: 200ms;
}

@keyframes eye-blink {
  0% {
    transform: scale(0.5);
  }

  70% {
    transform: scale(1.1);
  }

  100% {
    transform: none;
  }
}

.small {
  @apply --caption-2;

  color: var(--color-hint)
}

.room-cell-right {
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;

  :deep(.number){
    text-align: center;
  }
}
</style>
