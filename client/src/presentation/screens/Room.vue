<script setup lang="ts">
import WebApp from '@twa-dev/sdk'
import { onBeforeUnmount, onMounted } from 'vue'
import useInvoice from '@/domain/services/useInvoice'

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
  <div>
    Room description
  </div>
</template>

<style scoped>

</style>
@/domain/services/useInvoice
