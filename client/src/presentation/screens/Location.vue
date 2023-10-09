<script setup lang="ts">
import { List, ListItem, Sections, Section, Input, Placeholder } from '@/presentation/components'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useCities } from '@/domain/services/useCities'
import { useTripDetails } from '@/domain/services/useTripDetails'
import useTelegram from '@/application/services/useTelegram'
import { useRouter } from 'vue-router'
import EyesAnimation from '@/presentation/assets/lottie/eyes.json'
import { Vue3Lottie } from 'vue3-lottie'

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
const { showMainButton, hideMainButton, expand, showBackButton, hideBackButton } = useTelegram()
const router = useRouter()

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
        :compact="true"
      >
        <template #picture>
          <Vue3Lottie
            :animation-data="EyesAnimation"
            width="50px"
            height="50px"
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
