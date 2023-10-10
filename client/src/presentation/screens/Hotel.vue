<script setup lang="ts">
import { List, ListItem, Sections, Section, Amount, Placeholder, DataOverview, Avatar, Text, Rating, Lottie } from '@/presentation/components'
import { useHotel } from '@/domain/services/useHotel'
import { type ComputedRef, computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { reviews } from '@/infra/store/reviews/mock/reviews'
import { useTelegram, useThumbnail, useLottie } from '@/application/services'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
}) as {
  id: number | undefined;
}

const id = computed(() => {
  return props.id
})

/**
 * Hotel got by router param
 */
const { hotel } = id.value !== undefined ? useHotel(id as ComputedRef<number>) : { hotel: undefined }

/**
 * Methods for Showing/hiding Back button
 */
const { showBackButton, hideBackButton } = useTelegram()

/**
 * Router instance
 */
const router = useRouter()

/**
 * Thumbnail url and loading state
 */
const { pictureUrl, isPictureLoaded } = hotel?.value?.pictureThumb !== undefined
  ? useThumbnail(hotel.value.picture, hotel.value.pictureThumb)
  : { pictureUrl: undefined, isPictureLoaded: false }

/**
 * Lottie animation used when no cities found
 */
const { animationData } = useLottie('eyes')

const viewingRoomsIds = ref<number[]>([])
const viewingRoomsIdsTimeout = ref<ReturnType<typeof setTimeout> | undefined>(undefined)
const timeoutBeforeView = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

/**
 * Easter egg: simulate action like "someone is viewing this right now"
 */
const easterEgg = {
  /**
   * After 10 seconds, show animation
   */
  start() {
    timeoutBeforeView.value = setTimeout(() => {
      if (hotel?.value === undefined) {
        return
      }

      const randomRoom = hotel.value.rooms[Math.floor(Math.random() * hotel.value.rooms.length)]

      viewingRoomsIds.value = [randomRoom.id]

      if (viewingRoomsIdsTimeout.value !== undefined) {
        clearTimeout(viewingRoomsIdsTimeout.value)

        viewingRoomsIdsTimeout.value = undefined
      }

      viewingRoomsIdsTimeout.value = setTimeout(() => {
        viewingRoomsIds.value = []
      }, 4000)
    }, 10000)
  },

  /**
   * Clear memory
   */
  stop() {
    viewingRoomsIds.value = []

    if (timeoutBeforeView.value !== undefined) {
      clearTimeout(timeoutBeforeView.value)

      timeoutBeforeView.value = undefined
    }

    if (viewingRoomsIdsTimeout.value !== undefined) {
      clearTimeout(viewingRoomsIdsTimeout.value)

      viewingRoomsIdsTimeout.value = undefined
    }
  },
}

onMounted(() => {
  showBackButton(() => {
    void router.push('/')
  })

  easterEgg.start()
})

onBeforeUnmount(() => {
  hideBackButton()

  easterEgg.stop()
})
</script>
<template>
  <div v-if="hotel">
    <div
      class="cover"
      :class="{
        'cover--loading': !isPictureLoaded
      }"
      :style="{
        backgroundImage: `url('${pictureUrl}')`
      }"
    />
    <Sections>
      <Placeholder
        :title="hotel.title"
        :caption="hotel.subtitle"
      >
        <template #picture>
          <Avatar
            :src="hotel.picture"
            :picture-thumb="hotel.pictureThumb"
            big
          />
        </template>
      </Placeholder>

      <DataOverview
        :rating="hotel.rating"
        :award="hotel.award"
        :chart="hotel.chart"
      />
      <Section
        title="About"
        padded
      >
        <Text>
          {{ hotel.description }}
        </Text>
      </Section>
      <Section
        title="Rooms"
        padded
      >
        <List gapped>
          <ListItem
            v-for="room in hotel.rooms"
            :id="room.id"
            :key="hotel.id + '@' + room.id"
            :title="room.title"
            :subtitle="room.subtitle"
            :to="`/room/${hotel.id}/${room.id}`"
            big-avatar
            standalone
          >
            <template #picture>
              <Avatar
                :src="room.picture"
                :picture-thumb="room.pictureThumb"
                big
              />
              <Transition name="view">
                <div
                  v-if="viewingRoomsIds.includes(room.id)"
                  class="viewed"
                >
                  <Lottie
                    v-if="animationData"
                    :animation-data="animationData"
                    width="40px"
                    height="40px"
                  />
                </div>
              </Transition>
            </template>
            <template #right>
              <div class="room-cell-right">
                <Amount>
                  {{ room.price }}$

                  <template #postfix>
                    / night
                  </template>
                </Amount>
                <div class="book">
                  Book
                </div>
              </div>
            </template>
          </ListItem>
        </List>
      </Section>
      <Section
        title="Reviews"
        padded
      >
        <List
          with-background
          standalone
        >
          <ListItem
            v-for="(review, index) in reviews"
            :id="`${index}-review`"
            :key="`review-${index}`"
            :avatar="{placeholder: review.name}"
            :title="review.name"
            :subtitle="review.text"
          >
            <template #right>
              <Rating :value="review.rating" />
            </template>
          </ListItem>
        </List>
      </Section>
    </Sections>
  </div>
  <Placeholder
    v-else
    title="Nothing found"
    caption="Try searching for something else"
    :compact="true"
  >
    <template #picture>
      👀
    </template>
  </Placeholder>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.book {
  display: inline-flex;
  height: 26px;
  border-radius: 14px;
  background-color: var(--color-bg-tertiary);
  color: var(--color-link);
  align-items: center;
  padding: 0 13px;
  text-transform: uppercase;

  font-size: 13px;
  font-weight: 700;

  margin-top: 10px;
}

.room-cell-right {
  text-align: center;
}

.cover {
  position: relative;
  height: 200px;
  background-color: var(--color-bg);
  background-size: cover;
  background-position: 50% 50%;

  &--loading::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    backdrop-filter: blur(20px);
  }
}

.viewed {
  position: absolute;
  background-color: var(--color-overlay-floating);
  width: var(--size-avatar-big);
  height: var(--size-avatar-big);
  display: flex;
  align-items: center;
  border-radius: var(--size-border-radius-medium);
}

.view-enter-from ,
.view-leave-to {
  opacity: 0;
}

.view-enter-active,
.view-leave-active {
  transition: opacity 250ms ease;
}
</style>
