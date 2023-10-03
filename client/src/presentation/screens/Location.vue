<script setup lang="ts">
import List from '@/presentation/components/List.vue'
import ListItem from '@/presentation/components/ListItem.vue'
import Sections from '@/presentation/components/Sections.vue'
import Section from '@/presentation/components/Section.vue'
import Input from '@/presentation/components/Input/Input.vue'
import Placeholder from '@/presentation/components/Placeholder.vue'
import { computed, onMounted, ref } from 'vue'

/**
 * Search input value
 */
const searchQuery = ref('')

/**
 * Selected city id
 */
const selectedId = ref(0)

/**
 * Cities available as locations
 */
const cities = [
  {
    id: 1,
    title: 'London',
    emoji: '🇬🇧',
    country: 'United Kingdom',
  },
  {
    id: 2,
    title: 'Paris',
    emoji: '🇫🇷',
    country: 'France',
  },
  {
    id: 3,
    title: 'Berlin',
    emoji: '🇩🇪',
    country: 'Germany',
  },
  {
    id: 4,
    title: 'Rome',
    emoji: '🇮🇹',
    country: 'Italy',
  },
  {
    id: 5,
    title: 'Madrid',
    emoji: '🇪🇸',
    country: 'Spain',
  },
  {
    id: 6,
    title: 'Moscow',
    emoji: '🇷🇺',
    country: 'Russia',
  },
  {
    id: 7,
    title: 'Tokyo',
    emoji: '🇯🇵',
    country: 'Japan',
  },
  {
    id: 8,
    title: 'Beijing',
    emoji: '🇨🇳',
    country: 'China',
  },
  {
    id: 9,
    title: 'New Delhi',
    emoji: '🇮🇳',
    country: 'India',
  },
  {
    id: 10,
    title: 'Cairo',
    emoji: '🇪🇬',
    country: 'Egypt',
  },
  {
    id: 11,
    title: 'Brasília',
    emoji: '🇧🇷',
    country: 'Brazil',
  },
  {
    id: 12,
    title: 'Ottawa',
    emoji: '🇨🇦',
    country: 'Canada',
  },
  {
    id: 13,
    title: 'Canberra',
    emoji: '🇦🇺',
    country: 'Australia',
  },
  {
    id: 14,
    title: 'Wellington',
    emoji: '🇳🇿',
    country: 'New Zealand',
  },
  {
    id: 15,
    title: 'Washington, D.C.',
    emoji: '🇺🇸',
    country: 'United States',
  },
]

/**
 * Search result
 */
const citiesFiltered = computed(() => {
  return cities.filter(city => {
    return city.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

/**
 * Select city
 *
 * @param id - City id to select
 */
function selectCity(id: number): void {
  selectedId.value = id
}

onMounted(() => {
  /**
   * Scroll to top
   */
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="locations">
    <Sections>
      <Section
        padded
      >
        <Input
          v-model="searchQuery"
          placeholder="Search for a city"
          left-icon="search"
        />
      </Section>
      <Section
        with-background
        standalone
        v-if="citiesFiltered.length"
      >
        <List>
          <ListItem
            v-for="city in citiesFiltered"
            :id="city.id"
            :key="city.id"
            :title="city.title"
            :subtitle="city.country"
            :right-icon="selectedId === city.id ? 'checkmark' : undefined"
            @click="selectCity(city.id)"
          >
            <template #picture>
              <div class="list-emoji">
                {{ city.emoji }}
              </div>
            </template>
          </ListItem>
        </List>
      </Section>
      <Placeholder
        v-else
        title="No results"
        caption="Try searching for something else"
        :compact="true"
      >
        <template #picture>
          👀
        </template>
      </Placeholder>
    </Sections>
  </div>
</template>

<style scoped>
.list-emoji {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--size-avatar-medium);
  height: var(--size-avatar-medium);
  border-radius: 30px;
  font-size: 1.3rem;
  background-color: var(--color-bg-tertiary);
  letter-spacing: -1px;
}

.locations {
  :deep(.icon-checkmark) {
    animation: jump-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);

    svg {
      stroke: var(--color-link);
    }
  }

  :deep(.placeholder .pic) {
    width: 40px;
    height: 40px;
    margin-top: 20px;
    font-size: 36px;
    padding-bottom: 6px;
    animation: jump-in 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
}

@keyframes jump-in {
  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
}
</style>
