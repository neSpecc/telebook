<script setup lang="ts">
import { List, ListItem, Sections, Section, Input, Placeholder, Lottie } from '@/presentation/components'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useCities } from '@/domain/services/useCities'
import { useTripDetails } from '@/domain/services/useTripDetails'
import { useTelegram, useLottie } from '@/application/services'
import { useRouter } from 'vue-router'

/**
 * Cities list
 */
const { cities } = useCities()

/**
 * Search input value
 */
const searchQuery = ref('')

/**
 * Selected city id
 */
const selectedId = ref(0)

/**
 * Lottie animation used when no cities found
 */
const { animationData } = useLottie('eyes')

/**
 * Search result
 */
const citiesFiltered = computed(() => {
  return cities.value.filter(city => {
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

const { setCity, trip } = useTripDetails()
const { showMainButton, hideMainButton, expand, showBackButton, hideBackButton, vibrate } = useTelegram()
const router = useRouter()

/**
 * Vibrate when no cities found
 */
watch(citiesFiltered, () => {
  if (citiesFiltered.value.length === 0) {
    vibrate('light')
  }
})

onMounted(() => {
  if (trip.city !== 0) {
    selectedId.value = trip.city
  }

  expand()

  showMainButton('Select', () => {
    setCity(selectedId.value)

    void router.push('/')
  })

  showBackButton(() => {
    void router.back()
  })
})

onBeforeUnmount(() => {
  hideMainButton()
  hideBackButton()
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
        v-if="citiesFiltered.length"
        with-background
        standalone
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
      >
        <template #picture>
          <Lottie
            v-if="animationData"
            :animation-data="animationData"
            width="50px"
            height="50px"
            class="pic"
          />
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
    margin-top: 20px;
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
