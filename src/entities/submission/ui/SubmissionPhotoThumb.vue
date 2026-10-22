<script lang="ts" setup>
import type { SubmissionPhoto } from "../model/types";
import { usePhotoUrl } from "../model/usePhotoUrl";

const props = defineProps<{ photo: SubmissionPhoto }>();

const url = usePhotoUrl(() => props.photo.image_url);
</script>

<template>
  <div class="relative size-20 overflow-hidden rounded-lg bg-secondary-200">
    <img
      v-if="url"
      :src="url"
      :alt="photo.original_name"
      class="size-full object-cover"
    />
    <slot />
  </div>
</template>
