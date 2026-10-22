<script lang="ts" setup>
interface Props {
  disabled?: boolean
  id: string
  name: string
  value: string
}

withDefaults(defineProps<Props>(), {
  disabled: false,
  id: '',
})
</script>

<template>
  <input
    type="radio"
    :id="id"
    :name="name"
    :value="value"
    :disabled="disabled"
  />
</template>
