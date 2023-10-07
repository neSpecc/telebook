<!-- eslint-disable clean-timer/assign-timer-id -->
<script setup lang="ts">
import { Placeholder, List, ListItem, ListItemExpandable, Sections, Section, ListCard, DatePicker, DatePickerCompact, Amount, Rating } from '@/presentation/components'
import { onMounted, onUnmounted, ref, onBeforeUnmount } from 'vue'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { useTelegram } from '@/application/services'
import { hotels } from '@/infra/store/hotels/mock/hotels'
import { Vue3Lottie } from 'vue3-lottie'
import SearchAnimation from '@/presentation/assets/lottie/run.json'
import EyesAnimation from '@/presentation/assets/lottie/eyes.json'
import KrtekAnimation from '@/presentation/assets/lottie/krtek.json'
import RushAnimation from '@/presentation/assets/lottie/rush.json'
import SimpAnimation from '@/presentation/assets/lottie/simp.json'
import TouristAnimation from '@/presentation/assets/lottie/tourist.json'

import WebApp from '@twa-dev/sdk'

import { type Hotel } from '@/domain/entities'

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

/**
 * List loading state
 * Undefined when no search performed yet
 */
const isLoading = ref<boolean | undefined>(undefined)

const result = ref<Hotel[]>([])

const { showMainButton, hideMainButton, setButtonLoader, expand } = useTelegram()

/**
 * Hook called before search
 */
function onBeforeSearch(): void {
  expand()

  isLoading.value = true
  startDatePickerShowed.value = false
  endDatePickerShowed.value = false

  setButtonLoader(true)
}

/**
 * Hook called after search
 */
function onAfterSearch(): void {
  isLoading.value = false
  setButtonLoader(false)
  hideMainButton()
}

/**
 * Fake search method
 */
function search(): void {
  onBeforeSearch()

  setTimeout(() => {
    onAfterSearch()

    hotels.forEach((hotel, i) => {
      setTimeout(() => {
        result.value.push(hotel)
      }, i * 150)
    })
  }, 100)
}

onMounted(() => {
  if (trip.city === 0) {
    selectDefaultLocation()
  }

  showMainButton('Search', () => {
    search()
  })
})

onBeforeUnmount(() => {
  hideMainButton()
})

onUnmounted(() => {
  WebApp.BackButton.show()
})
</script>
<template>
  <div class="home-page">
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
    <Sections
      :class="{
        'with-filler': isLoading === true,
      }"
    >
      <Section
        with-background
        standalone
      >
        <List>
          <ListItem label="Travel date">
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
          <ListItem label="End date">
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
            label="Location"
            right-icon="chevron-right"
            :right-icon-label="location?.title"
            to="/location"
          />
        </List>
      </Section>
      <Section
        v-if="isLoading === true"
        class="section-filler"
      >
        <Vue3Lottie
          class="run"
          :animation-data="TouristAnimation"
          width="100px"
          height="100px"
        />
      </Section>
      <Section
        v-else-if="isLoading === false"
        padded
      >
        <List
          gapped
          class="results"
        >
          <template
            v-for="(hotel, index) in result"
            :key="'hotel:' + hotel.id"
          >
            <ListCard
              v-if="index === 3 || index === 5"
              :title="index === 3 ? 'Users choice' : 'Hotel of the year'"
              :picture="hotel.picture"
            >
              <template #visible>
                <ListItem
                  :id="1"
                  :avatar="{src: hotel.picture, placeholder: hotel.title}"
                  :title="hotel.title"
                  :subtitle="hotel.subtitle"
                  nowrap
                >
                  <template #right>
                    <Rating :value="hotel.rating.rating" />
                  </template>
                </ListItem>
              </template>
              <template #collapsed>
                <Sections>
                  {{ hotel.description }}
                  <List gapped>
                    <ListItem
                      :id="hotel.id"
                      transaction-icon="clock-fill"
                      title="Check rooms"
                      subtitle="There are 14 rooms available"
                      :to="`/hotel/${hotel.id}`"
                      right-icon="chevron-right"
                      standalone
                    />
                  </List>
                </Sections>
              </template>
            </ListCard>
            <ListItem
              v-else
              :id="hotel.id"
              :avatar="{src: hotel.picture, placeholder: hotel.title}"
              :title="hotel.title"
              :subtitle="hotel.subtitle"
              :to="`/hotel/${hotel.id}`"
              big-avatar
              standalone
              :is-loading="isLoading"
            >
              <template #right>
                <div class="room-cell-right">
                  <Amount>
                    <template #topline>
                      from
                    </template>
                    {{ hotel.price }}$
                  </Amount>
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
          </template>
        </List>
      </Section>
    </Sections>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;

  .sections {
    flex-grow: 1;
    grid-auto-rows: min-content;
  }

  .sections.with-filler {
    grid-template-rows: auto 1fr;
  }

  .section-filler {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

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

.run {
  /* animation: run 3.5s ease-in-out forwards; */
  /* right: 0; */
  /* position: absolute; */
  /* will-change: transform; */
}

@keyframes run {
  0% {
    transform: translateX(0)
  }

  100% {
    transform: translateX(-350px)
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 2.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.results {
  min-height: 800px;
}
</style>
