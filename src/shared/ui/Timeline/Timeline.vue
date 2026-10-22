<script lang="ts" setup>
interface Props {
  items: {
    icon: string
    subtitle: string
    title?: string | null
  }[]
}

defineProps<Props>()
</script>

<template>
  <div class="timeline flex flex-col gap-4">
    <div
      class="timeline__item flex items-start gap-3 p-2 relative"
      v-for="item in items"
    >
      <div class="bg-white/10 rounded-md p-1">
        <Icon :name="item.icon || 'Link'" class="bg-white" size="18px" />
      </div>
      <div class="flex flex-col">
        <span class="font-normal text-white text-sm">{{
          item.title || 'N/A'
        }}</span>
        <span class="text-white/40 text-xs">{{ item.subtitle }}</span>
      </div>
      <div
        class="timeline_line absolute bg-white/10 h-[calc(100%-22px)] w-px top-10 left-5"
      ></div>
    </div>
  </div>
</template>

<style lang="scss">
.timeline__item:last-child {
  .timeline_line {
    display: none;
  }
}
</style>
