<script setup lang="ts">
import { List, ListItem, Sections, Section, Amount, Placeholder, DataOverview, Avatar, Text, Rating } from '@/presentation/components'
import { useHotel } from '@/domain/services/useHotel'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { reviews } from '@/infra/store/reviews/mock/reviews'
import { useTelegram } from '@/application/services'
import { useRouter } from 'vue-router'

const props = defineProps({
  id: Number,
}) as {
  id: number | undefined;
}

const id = computed(() => {
  return props.id
})

const { hotel } = id.value !== undefined ? useHotel(id) : { hotel: undefined }
const { showBackButton, hideBackButton } = useTelegram()
const router = useRouter()

onMounted(() => {
  showBackButton(() => {
    void router.push('/')
  })
})

onBeforeUnmount(() => {
  hideBackButton()
})
</script>
<template>
  <div v-if="hotel">
    <div
      class="cover"
      :style="{
        backgroundImage: `url('${hotel.picture}')`
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
            :avatar="{ src: room.picture, placeholder: room.title }"
            :to="`/room/${hotel.id}/${room.id}`"
            big-avatar
            standalone
          >
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
  height: 200px;
  background-color: var(--color-bg);
  background-size: cover;
  background-position: 50% 50%;
}
</style>
