<!-- eslint-disable clean-timer/assign-timer-id -->
<script setup lang="ts">
import { Placeholder, List, ListItem, ListItemExpandable, Sections, Section, ListCard, DatePicker, DatePickerCompact, Amount, Rating, Text } from '@/presentation/components'
import { onMounted, ref, onBeforeUnmount, watchEffect, watch } from 'vue'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { useTelegram, useScroll } from '@/application/services'
import { hotels } from '@/infra/store/hotels/mock/hotels'
import { shortNumber } from '@/infra/utils/number'
import { Vue3Lottie } from 'vue3-lottie'
import SimpAnimation from '@/presentation/assets/lottie/simp.json'

import { type Hotel } from '@/domain/entities'

const {
  trip,
  location,
  selectDefault: selectDefaultLocation,
  setStartDate,
  setEndDate,
  days,
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

/**
 * Whether search is finished and we have results
 */
const isSearchFinished = ref(false)

/**
 * Search results
 */
const result = ref<Hotel[]>([])

const { showMainButton, hideMainButton, setButtonLoader, expand, getViewportHeight, vibrate } = useTelegram()
const { scrollTo } = useScroll()

const searchSettings = ref<InstanceType<typeof Section> | null>(null)
const startDatePicker = ref<InstanceType<typeof DatePicker> | null>(null)
const endDatePicker = ref<InstanceType<typeof DatePicker> | null>(null)
const landing = ref<InstanceType<typeof Placeholder> | null>(null)
const startDatePickerHeight = ref(0)
const endDatePickerHeight = ref(0)
const searchSettingsHeight = ref(130)
const viewportHeight = ref(window.innerHeight)

/**
 * Hook called before search
 */
function onBeforeSearch(): void {
  result.value = []

  requestAnimationFrame(() => {
    isLoading.value = true
    isSearchFinished.value = false
    startDatePickerShowed.value = false
    endDatePickerShowed.value = false

    setButtonLoader(true)
  })
}

/**
 * Hook called after search
 */
function onAfterSearch(): void {
  expand()
  isLoading.value = false
  isSearchFinished.value = true
  setButtonLoader(false)
  hideMainButton()

  setTimeout(() => {
    if (searchSettings.value !== null) {
      scrollTo(searchSettings.value.$el, 16)
    }
  }, 200)
}

/**
 * Fake search method
 */
function search(): void {
  onBeforeSearch()

  setTimeout(() => {
    onAfterSearch()

    vibrate()

    setTimeout(() => {
      /**
       * Shuffle mocks to make it look more real
       */
      const hotelsShuffled = hotels.sort(() => Math.random() - 0.5)

      hotelsShuffled.forEach((hotel, i) => {
        result.value.push(hotel)
      })
    }, 200) // wait until Telegram expand is finished to prevent Cards going to minimized state
  }, 3000)
}

/**
 * Handle start date click
 */
function onStartDateClick(): void {
  expand()
  startDatePickerShowed.value = !startDatePickerShowed.value
  endDatePickerShowed.value = false
}

/**
 * Handle end date click
 */
function onEndDateClick(): void {
  expand()
  endDatePickerShowed.value = !endDatePickerShowed.value
  startDatePickerShowed.value = false
}

/**
 * We need to update stored date picker height because it is used to calculate "landing" height
 */
watchEffect(() => {
  if (startDatePickerShowed.value) {
    startDatePickerHeight.value = startDatePicker.value?.$el.offsetHeight ?? 0
  } else {
    startDatePickerHeight.value = 0
  }

  if (endDatePickerShowed.value) {
    endDatePickerHeight.value = endDatePicker.value?.$el.offsetHeight ?? 0
  } else {
    endDatePickerHeight.value = 0
  }
})

/**
 * Clear result and reset state to the initial
 */
function resetSearch(): void {
  result.value = []
  isLoading.value = undefined
  isSearchFinished.value = false
  showMainButton('Search', () => {
    search()
  })
}

watch([
  () => trip.startDate,
  () => trip.endDate,
], () => {
  resetSearch()

  if (trip.startDate.getTime() > trip.endDate.getTime()) {
    setEndDate(new Date(trip.startDate.getTime() + 24 * 60 * 60 * 1000))
  }
})

onMounted(() => {
  if (trip.city === 0) {
    selectDefaultLocation()
  }

  resetSearch()

  requestAnimationFrame(() => {
    if (searchSettings.value !== null) {
      searchSettingsHeight.value = searchSettings.value.$el.offsetHeight
    }
  })

  viewportHeight.value = getViewportHeight()
})

onBeforeUnmount(() => {
  hideMainButton()
})

onBeforeUnmount(() => {
  setButtonLoader(false)
})
</script>
<template>
  <div class="home-page">
    <Placeholder
      ref="landing"
      class="landing"
      title="Telebook"
      caption="As simple as messaging"
      :class="{
        'landing--loading': isLoading,
        'landing--loaded': isSearchFinished,
      }"
    >
      <template #picture>
        <div class="landing-picture">
          <Transition name="switch">
            <img
              v-if="!isLoading"
              src="/telebook.svg"
              aria-hidden="true"
              width="68"
            >
            <Vue3Lottie
              v-else
              class="run"
              :animation-data="SimpAnimation"
              width="110px"
              height="110px"
            />
          </Transition>
        </div>
      </template>
    </Placeholder>
    <Sections>
      <Section
        ref="searchSettings"
        padded
      >
        <List
          with-background
          standalone
        >
          <ListItem label="Travel date">
            <template #right>
              <DatePickerCompact
                :value="trip.startDate"
                @click="onStartDateClick"
              />
            </template>
          </ListItem>
          <ListItemExpandable
            :opened="startDatePickerShowed"
          >
            <DatePicker
              ref="startDatePicker"
              :min-date="new Date()"
              @date-pick="(date) => setStartDate(date)"
            />
          </ListItemExpandable>
          <ListItem label="End date">
            <template #right>
              <DatePickerCompact
                :value="trip.endDate"
                @click="onEndDateClick"
              />
            </template>
          </ListItem>
          <ListItemExpandable
            :opened="endDatePickerShowed"
          >
            <!-- Max date is start + 60 -->
            <DatePicker
              ref="endDatePicker"
              :min-date="trip.startDate || new Date()"
              :max-date="new Date(trip.startDate.getTime() + 60 * 24 * 60 * 60 * 1000)"
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
        v-if="isLoading === false"
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
              :picture-thumb="hotel.pictureThumb"
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
                  <Section
                    title="About"
                    padded
                  >
                    <Text>
                      {{ hotel.description }}
                    </Text>
                  </Section>
                  <Section padded>
                    <List>
                      <ListItem
                        :id="hotel.id"
                        transaction-icon="clock-fill"
                        title="Check rooms"
                        :subtitle="`There are ${hotel.rooms.length} rooms available`"
                        :to="`/hotel/${hotel.id}`"
                        right-icon="chevron-right"
                        standalone
                      />
                    </List>
                  </Section>
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
                    {{ shortNumber(hotel.price * days) }}$
                    <template #subline>
                      for {{ days }} night{{ days > 1 ? 's' : '' }}
                    </template>
                  </Amount>
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

.landing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  will-change: height;
  transition: height 300ms ease;
  padding-block: 20px;

  &:not(&--loaded) {
    height: calc(var(--tg-viewport-stable-height) - v-bind('searchSettingsHeight + "px"') - var(--size-cell-h-margin) - var(--size-cell-v-margin) - v-bind('startDatePickerHeight + "px"') - v-bind('endDatePickerHeight + "px"'));
  }

  &--loading,
  &--loaded {
    transition: none;
  }

  &-picture {
    height: 110px;
    width: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  transform: translateZ(0);

  .sections {
    flex-grow: 1;
    grid-auto-rows: min-content;
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

  :deep(.amount){
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

.switch-enter-active,
.switch-leave-active {
  transition: transform 300ms cubic-bezier(.39,-0.26,.16,1.25), opacity 300ms ease;
  position: absolute;
}
.switch-enter-from {
  transform: scale(0.1);
}
.switch-leave-to {
  transform: scale(0.6);
  opacity: 0.5;
}
</style>
