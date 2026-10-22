<script lang="ts" setup></script>

<template>
  <div class="flex flex-col items-center gap-6">
    <!-- Animated loader -->
    <div class="relative w-16 h-16">
      <!-- Outer rotating circle -->
      <svg
        class="absolute inset-0 animate-spin"
        style="animation-duration: 3s"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="url(#gradient)"
          stroke-width="4"
          stroke-dasharray="141"
          stroke-dashoffset="0"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color: #4f3cc9; stop-opacity: 1" />
            <stop
              offset="100%"
              style="stop-color: #4f3cc9; stop-opacity: 0.4"
            />
          </linearGradient>
        </defs>
      </svg>

      <!-- Inner pulsing circle -->
      <div
        class="absolute inset-0 flex items-center justify-center"
        style="animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
      >
        <div
          class="w-8 h-8 rounded-full"
          style="background: #4f3cc9; opacity: 0.8"
        />
      </div>
    </div>

    <!-- Loading text with animation -->
    <div class="flex items-center gap-1">
      <p class="text-lg font-medium text-success-100">{{ $t('common.loading') }}</p>
      <div class="flex gap-1">
        <span
          class="inline-block w-1 h-1 rounded-full bg-success-100"
          style="animation: bounce 1.4s infinite"
        />
        <span
          class="inline-block w-1 h-1 rounded-full bg-success-100"
          style="animation: bounce 1.4s infinite 0.2s"
        />
        <span
          class="inline-block w-1 h-1 rounded-full bg-success-100"
          style="animation: bounce 1.4s infinite 0.4s"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(-8px);
    opacity: 0.5;
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(0.95);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}
</style>
