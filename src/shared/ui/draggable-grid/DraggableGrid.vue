<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Drag-to-scroll для матрицы
const matrixGridRef = ref<HTMLElement | null>(null)
let isDragging = false
let startX = 0
let scrollLeft = 0

const onMouseDown = (e: MouseEvent) => {
  if (e.button !== 0) return
  isDragging = true
  startX = e.clientX
  scrollLeft = matrixGridRef.value?.scrollLeft || 0
  document.body.style.cursor = 'grabbing'
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging) return
  if (!matrixGridRef.value) return
  const x = e.clientX
  const walk = x - startX
  matrixGridRef.value.scrollLeft = scrollLeft - walk
}
const onMouseUp = () => {
  isDragging = false
  document.body.style.cursor = ''
}

onMounted(async () => {
  const grid = matrixGridRef.value
  if (grid) {
    grid.addEventListener('mousedown', onMouseDown)
    grid.addEventListener('mousemove', onMouseMove)
    grid.addEventListener('mouseleave', onMouseUp)
    grid.addEventListener('mouseup', onMouseUp)
  }
})

onBeforeUnmount(() => {
  const grid = matrixGridRef.value
  if (grid) {
    grid.removeEventListener('mousedown', onMouseDown)
    grid.removeEventListener('mousemove', onMouseMove)
    grid.removeEventListener('mouseleave', onMouseUp)
    grid.removeEventListener('mouseup', onMouseUp)
  }
})
</script>

<template>
  <div
    id="matrix-grid"
    style="cursor: grab; user-select: none"
    class="overflow-auto scroll-none"
    ref="matrixGridRef"
  >
    <slot></slot>
  </div>
</template>
