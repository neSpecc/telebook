<script setup lang="ts">
import { List, ListItem, Sections, Section, Number, Placeholder, DataOverview, Avatar } from '@/presentation/components'
import { useHotel } from '@/domain/services/useHotel'
import { computed, type PropType } from 'vue'

const props = defineProps({
  id: Number,
}) as {
  id: number | undefined;
}

const id = computed(() => {
  return props.id
})

const { hotel } = id.value !== undefined ? useHotel(id) : { hotel: undefined }

/**
 * Hotel reviews mock
 */
const reviews = [
  {
    name: 'Blazing Bear',
    rating: 5,
    text: 'Great hotel, great service, great location',
  },
  {
    name: 'Crazy Horse',
    rating: 4.5,
    text: 'Very nice hotel, but the food could be better',
  },
  {
    name: 'Ugly Parrot',
    rating: 3,
    text: 'Not bad, but not good either',
  },
  {
    name: 'Grey Wolf',
    rating: 5,
    text: 'Nothing to complain about. Everything was perfect',
  },
  {
    name: 'Clever Fox',
    rating: 4.9,
    text: 'I would definitely recommend this hotel to my friends',
  },
]
</script>
<template>
  <div v-if="hotel">
    <div
      class="cover"
      style="background-image: url('/pics/hotel-1.jpg');"
    />

    <Placeholder
      image="/pics/hotel-1.jpg"
      :title="hotel.title"
      :caption="hotel.subtitle"
    >
      <template #picture>
        <Avatar
          src="/pics/hotel-1.jpg"
          big
        />
      </template>
    </Placeholder>

    <DataOverview
      :rating="hotel.rating"
      :award="hotel.award"
      :chart="hotel.chart"
    />
    <Sections>
      <Section padded>
        <List gapped>
          <ListItem
            v-for="room in hotel.rooms"
            :id="room.id"
            :key="hotel.id + '@' + room.id"
            :label="room.title"
            :subtitle="room.subtitle"
            :avatar="{ src: room.picture, placeholder: room.title }"
            :to="`/room/${hotel.id}/${room.id}`"
            big-avatar
            standalone
          >
            <template #right>
              <div class="room-cell-right">
                <Number>
                  {{ room.price }}$

                  <template #subline>
                    per night
                  </template>
                </Number>
                <div class="book">
                  Book
                </div>
              </div>
            </template>
          </ListItem>
        </List>
      </Section>
      <Section
        with-background
        standalone
        title="Reviews"
      >
        <ListItem
          v-for="(review, index) in reviews"
          :id="`${index}-review`"
          :key="`review-${index}`"
          :avatar="{placeholder: review.name}"
          :label="review.name"
          :subtitle="review.text"
        >
          <template #right>
            <div class="review-rating">
              <Number>
                {{ review.rating }}
              </Number>
              <div class="stars">
                <template
                  v-for="i in 5"
                  :key="`star${i}`"
                >
                  {{ i <= review.rating ? '★' : '☆' }}
                </template>
              </div>
            </div>
          </template>
        </ListItem>
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
  height: 28px;
  border-radius: 14px;
  background-color: var(--color-bg-secondary);
  color: var(--color-link);
  align-items: center;
  padding: 0 14px;
  text-transform: uppercase;

  font-size: 13px;
  font-weight: 700;

  margin-top: 6px;
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

.review-rating {
  text-align: center;
  .stars {
    font-size: 8px;
    margin-top: 4px;
  }
}
</style>
