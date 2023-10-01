<script setup lang="ts">
import WebApp from '@twa-dev/sdk'
import { onBeforeUnmount, onMounted } from 'vue'
import useInvoice from '@/application/services/useInvoice'

const { create: createInvoice } = useInvoice()

function buttonClicked(): void {
  console.log('Main button clicked')

  void createInvoice({
    title: 'Room',
    description: 'Room description',
    payload: '12333',
    provider_token: '381764678:TEST:12345',
    currency: 'USD',
    prices: [
      {
        label: 'Room price',
        amount: 1000,
      },
    ],
  })

  WebApp.openInvoice('https://t.me/invoice/12333', (data) => {
    console.log('Invoice opened', data)
  })
  WebApp.switchInlineQuery('#133', ['users', 'groups'])
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
