<script lang="ts" setup>
interface Props {
  class: string
}

const props = defineProps<Props>()
</script>

<template>
  <Form :class="props.class">
    <slot></slot>
  </Form>
</template>
