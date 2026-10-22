<script lang="ts" setup>
import { onMounted } from 'vue'

const props = defineProps<{
  tabs: {
    id: string
    name: string
  }[]
}>()

const activeTab = defineModel<string>()

onMounted(() => {
  if (!activeTab.value && props.tabs[0]) {
    activeTab.value = props.tabs[0].id
  }
})
</script>

<template>
  <div class="flex gap-6 items-center">
    <div
      v-for="tab in tabs"
      :key="tab.id"
      class="pb-1.5 cursor-pointer flex flex-col gap-1.5"
      @click="activeTab = tab.id"
    >
      <span
        class="text-sm font-semibold text-white/40"
        :class="{ '!text-white': activeTab === tab.id }"
        >{{ tab.name }}</span
      >
      <div
        v-if="activeTab === tab.id"
        class="w-full h-0.5 bg-danger"
        style="box-shadow: 0px -2px 10px 0px #f21c40"
      ></div>
      <div v-else class="w-full h-0.5 bg-transparent"></div>
    </div>
  </div>
</template>
