<script setup lang="ts">
import List from '@/components/List.vue'
import ListItem from '@/components/ListItem.vue'
import Sections from '@/components/Sections.vue'
import Section from '@/components/Section.vue'
import Number from '@/components/Number.vue'
import Placeholder from '@/components/Placeholder.vue'
import DataOverview from '@/components/DataOverview.vue'
import Avatar from '@/components/Avatar.vue'

const rooms = [
  {
    hotelId: '1',
    id: '1',
    title: 'Luxury Room with Balcony',
    description: 'Comfortable room with balcony and view to the city. The room has a double bed, a desk, a TV, a minibar, a safe, a wardrobe and a bathroom with shower.',
    price: 152,
    avatar: {
      id: 1,
      src: '/pics/room-1-1.jpg',
    },
  },
  {
    hotelId: '1',
    id: '2',
    title: 'Deluxe King Room',
    description: 'Large room with a double bed, a desk, a TV, a minibar, a safe, a wardrobe and a bathroom with shower.',
    price: 260,
    avatar: {
      id: 1,
      src: '/pics/room-1-1.jpg',
    },
  },
]
</script>
<template>
  <div>
    <div
      class="cover"
      style="background-image: url('/pics/hotel-1.jpg');"
    />

    <Placeholder
      image="/pics/hotel-1.jpg"
      title="Sunset Beach Hotel"
      caption="Compfortable hotel with a beautiful view to the sea. The hotel has a restaurant, a bar, a swimming pool, a gym and a spa."
    >
      <template #picture>
        <Avatar
          src="/pics/hotel-1.jpg"
          big
        />
      </template>
    </Placeholder>

    <DataOverview />
    <Sections>
      <Section padded
      >
        <List gapped>
          <ListItem
            v-for="room in rooms"
            :id="room.id"
            :key="room.hotelId + '@' + room.id"
            :label="room.title"
            :subtitle="room.description"
            :avatar="room.avatar"
            :to="`/room/${room.hotelId}/${room.id}`"
            big-avatar
            standalone=""
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
    </Sections>
  </div>
</template>

<style scoped>
@import '../styles/theme/typescale.css';

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
</style>
