<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

function toggle() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <button
    :class="[
      'relative inline-flex h-4 w-7 items-center rounded-full transition-colors focus:outline-none',
      modelValue ? 'bg-info' : 'bg-[#4E4C4D]',
    ]"
    role="switch"
    :aria-checked="modelValue"
    @click="toggle"
    @keydown.space.prevent="toggle"
    tabindex="0"
  >
    <span
      :class="[
        'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
        modelValue ? 'translate-x-3.5' : 'translate-x-0.5',
      ]"
    />
  </button>
</template>
