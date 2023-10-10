<script setup lang="ts">
import { Icon } from '@/presentation/components'
import { defineProps, defineEmits } from 'vue'

defineProps<{
  /**
   * Model value. Will be changed on input
   */
  modelValue: string;

  /**
   * Text that will be shown when input is empty
   */
  placeholder?: string;

  /**
   * Name of icon that will be shown on the left side of input
   */
  leftIcon?: string;
}>()

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <Icon
      v-if="leftIcon"
      :name="leftIcon"
    />
    <input
      type="text"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    >
  </div>
</template>

<style scoped>
@import '@/presentation/styles/theme/typescale.css';
.input {
  color: var(--color-hint);
  display: flex;
  padding: 10px 12px;
  gap: 4px;
  background: var(--color-bg);
  border-radius: var(--size-border-radius-big);
  align-items: center;

  :deep(.icon){
    display: flex;
    align-content: center;
    justify-content: center;
    self-align: center;
    width: 22px;
    height: 22px;
  }

  :deep(svg) {
    fill: currentColor;
    width: 21px;
    height: 22px;
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    color: inherit;
    width: 100%;
    padding: 0;
    margin: 0;
    appearance: none;
    color: var(--color-text);

    @apply --body;

    &::placeholder {
      color: var(--color-hint);
    }
  }
}
</style>
