<script setup lang="ts">
import { ref, computed, nextTick, onBeforeUnmount } from 'vue'
import { Icon } from '@/presentation/components'

/**
 * Now date
 */
const currentDate = new Date()

/**
 * Current year and month
 */
const year = ref(currentDate.getFullYear())
const month = ref(currentDate.getMonth())

/**
 * Current selected date
 */
const selectedDate = ref(currentDate)

/**
 * Name of the current month
 */
const monthName = computed(() => {
  const date = new Date(year.value, month.value)
  return date.toLocaleString('default', { month: 'long' })
})

/**
 * List of week days
 */
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

/**
 * List of days in current month including empty days
 */
const days = computed(() => {
  const date = new Date(year.value, month.value)
  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate()

  const firstDayOfWeek = date.getDay()
  const list = []

  /**
   * If first day is Sunday, add 6 empty days
   */
  if (firstDayOfWeek === 0) {
    for (let i = 0; i < 6; i++) {
      list.push('')
    }
  /**
   * If first day is not Sunday, add empty days until first day
   */
  } else if (firstDayOfWeek !== 1) {
    for (let i = 1; i < firstDayOfWeek; i++) {
      list.push('')
    }
  }

  for (let i = 1; i <= daysInMonth; i++) {
    list.push(i)
  }

  return list
})

/**
 * Check if passed day is current
 *
 * @param day - Day to check
 */
function isCurrentDay(day: number | string): boolean {
  if (typeof day === 'string') {
    return false
  }

  return day === currentDate.getDate() && month.value === currentDate.getMonth() && year.value === currentDate.getFullYear()
}

/**
 * Check if passed day is selected
 *
 * @param day - Day to check
 */
function isSelectedDay(day: number | string): boolean {
  if (typeof day === 'string') {
    return false
  }

  return day === selectedDate.value.getDate() && month.value === selectedDate.value.getMonth() && year.value === selectedDate.value.getFullYear()
}

/**
 * Reference to days container
 */
const daysRef = ref<HTMLElement | null>(null)

/**
 * "leave" animation state
 */
const curMonthLeave = ref<'left' | 'right' | null>(null)

/**
 * "enter" animation state
 */
const newMonthEnter = ref<'left' | 'right' | null>(null)

/**
 * Timeout between "leave" and "enter" animations
 */
const newMonthEnterTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

/**
 * Before month change hook.
 * Starts "leave" animation and clears "enter" animation
 *
 * @param direction - Direction of change
 */
function onBeforeMonthChange(direction: 'left' | 'right'): void {
  curMonthLeave.value = direction
  newMonthEnter.value = null
}

/**
 * After month change hook.
 * Clears "leave" animation and start "enter" animation
 *
 * @param direction - Direction of change
 */
function onAfterMonthChange(direction: 'left' | 'right'): void {
  curMonthLeave.value = null
  newMonthEnter.value = direction

  newMonthEnterTimeout.value = setTimeout(() => {
    newMonthEnter.value = null
  }, 50)
}

/**
 * Dispose of mouth change.
 * Used for animation
 *
 * @param changer - Function that changes month
 * @param direction - Direction of change
 */
function withDaysChange(changer: () => void, direction: 'left' | 'right'): void {
  onBeforeMonthChange(direction)

  daysRef.value?.addEventListener('transitionend', () => {
    changer()
    void nextTick(() => {
      onAfterMonthChange(direction)
    })
  }, { once: true })
}

/**
 * Switch calendar to the previous month
 */
function previousMonth(): void {
  withDaysChange(() => {
    if (month.value === 0) {
      year.value--
      month.value = 11
    } else {
      month.value--
    }
  }, 'left')
}

/**
 * Switch calendar to the next month
 */
function nextMonth(): void {
  withDaysChange(() => {
    if (month.value === 11) {
      year.value++
      month.value = 0
    } else {
      month.value++
    }
  }, 'right')
}

const emit = defineEmits<{
  /**
   * Fired when some date is selected
   */
  datePick: [date: Date];
}>()

/**
 * Day select handler
 *
 * @param day - Selected day
 */
function onDateSelected(day: number | string): void {
  if (typeof day === 'string') {
    return
  }

  selectedDate.value = new Date(year.value, month.value, day)

  emit('datePick', selectedDate.value)
}

/**
 * Clear garbage before leaving
 */
onBeforeUnmount(() => {
  if (newMonthEnterTimeout.value !== null) {
    clearTimeout(newMonthEnterTimeout.value)
  }
})
</script>

<template>
  <div class="date-picker">
    <div class="header">
      <div class="month-and-year">
        {{ monthName }} {{ year }}
      </div>

      <div class="arrows">
        <button @click="previousMonth">
          <Icon name="arrow-left" />
        </button>
        <button @click="nextMonth">
          <Icon name="arrow-right" />
        </button>
      </div>
    </div>
    <div class="weekdays">
      <div
        v-for="day in weekDays"
        :key="`weekday:${day}`"
        class="weekday"
      >
        {{ day }}
      </div>
    </div>
    <div
      ref="daysRef"
      class="days"
      :class="{
        'days--month-changed-left': curMonthLeave === 'left',
        'days--month-changed-right': curMonthLeave === 'right',
        'days--new-month-changed-left': newMonthEnter === 'left',
        'days--new-month-changed-right': newMonthEnter === 'right',
      }"
    >
      <div
        v-for="(day, index) in days"
        :key="`${index}:${month}:${year}`"
        class="day"
        :class="{
          'day--current': isCurrentDay(day),
          'day--selected': isSelectedDay(day)
        }"
        @click="onDateSelected(day)"
      >
        <span
          v-if="isSelectedDay(day)"
          class="day-number"
        >
          {{ day }}
        </span>
        <template v-else>
          {{ day }}
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';

.date-picker {
  /* background-color: var(--color-bg); */
  /* border-radius: var(--size-border-radius-big); */
  padding-top: 6px;
  overflow: hidden;
  user-select: none
}

.month-and-year {
  @apply --headline--semibold;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px var(--size-cell-h-padding) 11px
}

.arrows {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;

  button {
    width: 24px;
    height: 24px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

  :deep(svg) {
    fill: var(--color-link);
  }
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 32px);
  justify-content: space-between;
  padding: 1px var(--size-cell-h-padding);
}

.weekday {
  color: var(--color-hint);

  @apply --footnote-caps-semibold;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 40px);
  row-gap: 7px;
  padding: 3px var(--size-cell-h-padding) 11px;
  justify-content: space-between;
  will-change: opacity, transform;
  min-height: 313px;
  transition: opacity 200ms ease, transform 200ms ease 40ms;

  &--month-changed-left,
  &--month-changed-right,
  &--new-month-changed-left,
  &--new-month-changed-right {
    opacity: 0;
  }

  &--month-changed-left {
    transform: translateX(40px);
  }

  &--month-changed-right {
    transform: translateX(-40px);
  }

  &--new-month-changed-left,
  &--new-month-changed-right {
    transition: none;
  }

  &--new-month-changed-left {
    transform: translateX(-30px);
  }

  &--new-month-changed-right {
    transform: translateX(30px);
  }
}

.day {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  cursor: pointer;

  @apply --title-3;

  &--current {
    color: var(--color-link);
  }

  &--selected {
    color: var(--color-link);
    font-weight: 510;

    &::before {
      content: '';
      display: block;
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      border-radius: 50%;
      background-color: #fff;
      background-color: var(--color-link);
      position: absolute;
      z-index: 1;
      opacity: 0.24;
      animation: circle-enter 200ms cubic-bezier(.4,-0.31,0,1.23);
      will-change: transform, opacity;

      @media (prefers-color-scheme: light) {
        opacity: 0.12;
      }
    }
  }

  &--selected.day--current {
    color: #fff;

    &::before {
      opacity: 1;
    }
  }
}

@keyframes circle-enter {
  from {
    transform: scale(1.1);
    opacity: 0;
  }

  80% {
    transform: scale(0.98);
  }

  to {
    transform: scale(1);
  }
}

.day-number {
  z-index: 2;
}
</style>
