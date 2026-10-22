<script setup lang="ts">
import { ref, watchEffect, nextTick } from 'vue'

const props = defineProps<{
  visible: boolean
  x: number
  y: number
  minWidth?: string
  maxWidth?: string
  class?: string
}>()

const tooltipRef = ref<HTMLElement | null>(null)
const tooltipPosition = ref({ left: 0, top: 0 })

watchEffect(async () => {
  if (!tooltipRef.value || !props.visible) return
  await nextTick()
  const padding = 16
  let left = props.x + padding
  let top = props.y + padding
  const rect = tooltipRef.value.getBoundingClientRect()
  const width = rect.width
  const height = rect.height

  // Если тултип выходит за правую границу
  if (left + width > window.innerWidth) {
    left = props.x - width - padding
    if (left < 0) left = 0
  }

  // Если тултип выходит за нижнюю границу
  if (top + height > window.innerHeight) {
    top = props.y - height - padding
    if (top < 0) top = 0
  }

  tooltipPosition.value = { left, top }
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="props.visible"
      ref="tooltipRef"
      :style="{
        position: 'fixed',
        left: tooltipPosition.left + 'px',
        top: tooltipPosition.top + 'px',
        zIndex: 1000,
        minWidth: props.minWidth || '380px',
        maxWidth: props.maxWidth || '450px',
      }"
      :class="
        props.class
          ? props.class
          : 'bg-[#232021] rounded-xl shadow-lg border border-white/10 p-4 text-white text-sm animate-fade-in'
      "
    >
      <slot />
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.15s ease;
}
</style>
