<script lang="ts" setup>
interface Props {
  modelValue?: boolean
  disabled?: boolean
  label?: string
  id?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  label: '',
  id: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <div
      :id="props.id"
      class="relative w-4 h-4 cursor-pointer"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      @click="toggle"
    >
      <input
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        class="sr-only"
        @change="toggle"
      />
      <div
        class="w-4 h-4 border-2 rounded-md transition-all duration-200"
        :class="[
          modelValue
            ? 'bg-red-500 border-red-500'
            : 'bg-transparent border-white/20 hover:border-red-300',
        ]"
      >
        <svg
          v-if="modelValue"
          class="w-2 h-1.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          viewBox="0 0 7 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.00872 0.198901C6.31309 0.479854 6.33207 0.954348 6.05111 1.25871L3.23979 4.30432C2.83664 4.74106 2.1438 4.73185 1.75241 4.28454L0.185578 2.49388C-0.0871838 2.18215 -0.0555957 1.70833 0.256132 1.43557C0.567859 1.16281 1.04168 1.1944 1.31444 1.50613L2.51493 2.87811L4.94891 0.241294C5.22986 -0.0630719 5.70436 -0.0820517 6.00872 0.198901Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
    <label
      v-if="label"
      :for="id"
      class="text-sm text-white cursor-pointer select-none"
      :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      @click="toggle"
    >
      {{ label }}
    </label>
  </div>
</template>
