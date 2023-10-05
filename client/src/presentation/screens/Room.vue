<script setup lang="ts">
import WebApp from '@twa-dev/sdk'
import { computed, onBeforeUnmount, onMounted } from 'vue'
import { useHotel } from '@/domain/services/useHotel'
import useInvoice from '@/domain/services/useInvoice'
import { PageWithHeader, Placeholder, Icon, Section, List, ListItem, Number } from '@/presentation/components'

const props = defineProps({
  hotelId: Number,
  roomId: Number,
}) as {
  hotelId: number | undefined;
  roomId: number | undefined;
}

const hotelId = computed(() => props.hotelId)
const roomId = computed(() => props.roomId)

const { hotel } = useHotel(hotelId)

const room = computed(() => {
  if (hotel.value === undefined) {
    return undefined
  }

  return hotel.value.rooms.find(room => room.id === roomId.value)
})

/**
 * Mocked room amenities
 */
const amenities = [
  {
    icon: 'square-filled-wifi',
    name: 'Free Wi-Fi',
  },
  {
    icon: 'square-filled-bed',
    name: 'King size bed',
  },
  {
    icon: 'square-filled-air',
    name: 'Air Conditioner',
  },
  {
    icon: 'square-filled-parking',
    name: 'Free parking',
  },
  {
    icon: 'square-filled-safe',
    name: 'Safety deposit box',
  },
  {
    icon: 'square-filled-sport',
    name: 'Sport facilities',
  },
]

const { create: createInvoice } = useInvoice()

async function buttonClicked(): Promise<void> {
  WebApp.MainButton.showProgress()

  const host = 'https://45e9-51-158-186-93.ngrok-free.app'

  // console.log('WebApp.initDataUnsafe', WebApp.initDataUnsafe)

  const invoiceLink = await createInvoice({
    // @ts-expect-error
    // chatId: WebApp.initDataUnsafe.chat_instance,
    title: 'Room',
    description: 'Room description',
    payload: '12333',
    currency: 'USD',
    photo_url: `${host}/pics/room-1-1.jpg`,
    photo_size: 126989,
    photo_width: 1024,
    photo_height: 1024,
    need_name: true,
    prices: [
      {
        label: 'Room price',
        amount: 10000,
      },
      {
        label: 'City tax',
        amount: 600,
      },
      {
        label: 'Service fee',
        amount: 1000,
      },
    ],
  })

  WebApp.MainButton.hideProgress()

  if (invoiceLink === null) {
    WebApp.showAlert('could not create invoice')

    return
  }

  /**
   * Open invoice in TWA
   *
   * @param invoiceLink - Invoice link
   * @param callback - on-close callback. Statuses:  "pending" | "failed" | "cancelled" | "paid"
   */
  WebApp.openInvoice(invoiceLink, (closingStatus) => {
    switch (closingStatus) {
      case 'paid':
        WebApp.close()
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
  // WebApp.switchInlineQuery('#133')
  // WebApp.switchInlineQuery('#133', ['users', 'groups'])
}

onMounted(() => {
  WebApp.MainButton.text = 'Book now'
  WebApp.MainButton.isVisible = true

  WebApp.MainButton.onClick(buttonClicked)
})

onBeforeUnmount(() => {
  WebApp.MainButton.offClick(buttonClicked)
  WebApp.MainButton.isVisible = false
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
      <Section standalone>
        <Placeholder
          :title="room.title"
          :caption="room.subtitle"
          standalone
        >
          <template #picture>
            <Avatar
              src="/pics/room-1-2.jpg"
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
            {{ room.price }}$
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
</style>
