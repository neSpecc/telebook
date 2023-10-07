<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useHotel, useTripDetails, useInvoice } from '@/domain/services'
import { useScroll, useTelegram } from '@/application/services'
import { PageWithHeader, Placeholder, Icon, Section, Sections, List, ListItem, Number, Avatar } from '@/presentation/components'
import { amenities } from '@/infra/store/hotels/mock/amenities'
import { formatDate } from '@/infra/utils/date'
import { format } from 'path'

const props = defineProps({
  /**
   * Selected hotel identifier (got from route params)
   */
  hotelId: Number,

  /**
   * Identifier of the selected room in a hotel (got from route params)
   */
  roomId: Number,
}) as {
  hotelId: number | undefined;
  roomId: number | undefined;
}

/**
 * Selected hotel identifier
 */
const hotelId = computed(() => props.hotelId)

/**
 * Identifier of the selected room in a hotel
 */
const roomId = computed(() => props.roomId)

const { days, trip } = useTripDetails()
const { hotel } = useHotel(hotelId)
const { setButtonLoader, showAlert, openInvoice, closeApp, showMainButton, hideMainButton } = useTelegram()
const { create: createInvoice, toPrice } = useInvoice()

/**
 * Selected room data
 */
const room = computed(() => {
  if (hotel.value === undefined) {
    return undefined
  }

  return hotel.value.rooms.find(room => room.id === roomId.value)
})

/**
 * Total price for the selected room for the selected days
 * Does not include service fee
 */
const roomAmount = computed(() => {
  if (room.value === undefined) {
    return 0
  }

  return room.value.price * days.value
})

/**
 * Main button click handler
 */
async function buttonClicked(): Promise<void> {
  setButtonLoader(true)

  if (room.value === undefined) {
    showAlert('Room not found')

    return
  }



  const invoiceLink = await createInvoice({
    title: room.value.title,
    description: `${formatDate(trip.startDate, true)} — ${formatDate(trip.endDate, true)}`,
    currency: 'USD',
    photo_url: `${import.meta.env.VITE_WEB_HOST}/${room.value.picture}`,
    photo_size: 126989,
    photo_width: 1024,
    photo_height: 1024,
    need_name: true,
    prices: [
      {
        label: `Room ${days.value} × ${room.value.price}$`,
        amount: toPrice(room.value.price * days.value),
      },
      {
        label: 'Transfer',
        amount: toPrice(100),
      },
      {
        label: 'Service fee 5%',
        amount: toPrice(roomAmount.value * 0.05),
      },
      {
        label: 'Breakfast included',
        amount: 0,
      },
    ],
  })

  setButtonLoader(false)

  if (invoiceLink === null) {
    showAlert('could not create invoice')

    return
  }

  /**
   * Open invoice in TWA
   *
   * @param invoiceLink - Invoice link
   * @param callback - on-close callback. Statuses:  "pending" | "failed" | "cancelled" | "paid"
   */
  openInvoice(invoiceLink, (closingStatus) => {
    switch (closingStatus) {
      case 'paid':
        closeApp()
        break
      case 'cancelled':
        // WebApp.showAlert('canceled')
        break
      case 'failed':
        // WebApp.showAlert('expired')
        break
      case 'pending':
        // WebApp.showAlert('pending')
        break
      default:
        // WebApp.showAlert('unknown')
    }
  })
}

const { lock, unlock } = useScroll()

onMounted(() => {
  /**
   * Block document scroll. We use internal scroll on this screen for better native-like UX
   */
  lock()

  /**
   * Show main Telegram CTA
   */
  showMainButton('Book now', () => {
    void buttonClicked()
  })
})

onBeforeUnmount(() => {
  hideMainButton()

  unlock()
})
</script>

<template>
  <PageWithHeader
    v-if="room && hotel"
    class="page"
  >
    <template #header>
      <Section>
        <ListItem
          :avatar="{src: '/pics/hotel-3.jpg', placeholder: hotel.title}"
          :title="hotel.title"
          :subtitle="hotel.subtitle"
          :to="`/hotel/${hotel.id}`"
        />
      </Section>
    </template>
    <template #content>
      <Sections class="form">
        <Section standalone>
          <Placeholder
            :title="room.title"
            :caption="room.subtitle"
            standalone
          >
            <template #picture>
              <Avatar
                :src="room.picture"
                big
              />
            </template>
          </Placeholder>
        </Section>

        <Section
          padded
          title="Price"
        >
          <List
            with-background
            standalone
          >
            <ListItem
              label="Room price"
            >
              <template #right>
                <span>{{ Math.max(1, days) }} × {{ room.price }}$</span>
              </template>
            </ListItem>
            <ListItem
              label="Breakfast"
            >
              <template #right>
                <span>Included</span>
              </template>
            </ListItem>
            <ListItem
              label="Transfer"
            >
              <template #right>
                <Number>100$</Number>
              </template>
            </ListItem>
          </List>
        </Section>
        <Section
          title="Amenities"
          padded
        >
          <List
            with-background
            standalone
          >
            <ListItem
              v-for="(amenity, index) in amenities"
              :key="'amenity' + index"
              :icon="amenity.icon"
              :label="amenity.name"
              right-icon="checkmark"
            />
          </List>
        </Section>
      </Sections>
    </template>
  </PageWithHeader>
  <div
    v-if="room"
    class="total"
  >
    <div class="price">
      <ListItem
        label="Total Price"
        subtitle="For 4 night stand"
      >
        <template #picture>
          <Icon
            name="card"
          />
        </template>
        <template #right>
          <Number>
            {{ roomAmount }}$
          </Number>
        </template>
      </ListItem>
    </div>
  </div>
</template>

<style scoped>
.total {
  position: sticky;
  bottom: 8px;
  padding: 4px;
  background-color: rgba(19, 19, 19, 0.84);
  color: white;
  backdrop-filter: blur(10px);
  right: 0;
  left: 0;
  border-radius: 16px;
  margin: 8px;

  .price {
    /* padding: 16px; */
    border-radius: var(--size-border-radius-big);

    &:deep(.number){
      font-size: 22px;
      gap: 4px;
    }

    &:deep(.topline){
      margin-bottom: 4px;
    }

    &:deep(.icon){
      width: 20px;
      display: block;
      animation: shake 500ms cubic-bezier(0.19, 1, 0.22, 1) ;
      will-change: transform;
    }
  }
}

@keyframes shake {
  0% {
    transform: rotate(-10deg) scale(0.2);
  }

  30% {
    transform: rotate(5deg) scale(1);
  }

  50% {
    transform: rotate(-5deg) scale(1.1);
  }

  75% {
    transform: rotate(5deg) scale(1);
  }

  100% {
    transform: none;
  }
}

.form {
  padding-bottom: 90px;
}
</style>
