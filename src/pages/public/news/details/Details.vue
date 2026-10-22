<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { NewsDetail } from "@/widgets/news";

const route = useRoute();
const slug = computed(() => String(route.params.id ?? ""));
</script>

<template>
  <NewsDetail :slug="slug" />
</template>
