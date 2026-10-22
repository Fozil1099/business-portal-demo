<script lang="ts" setup>
import { Btn, Icon } from "@/shared/ui";
import type { CompanyCertificate } from "@/features/cabinet/company";
import { downloadFile } from "@/shared/utils/file";

const emit = defineEmits<{
  (e: "update"): void;
}>();

withDefaults(
  defineProps<{
    certificates?: CompanyCertificate[];
  }>(),
  { certificates: () => [] },
);
</script>

<template>
  <div class="card space-y-5">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold leading-6 tracking-[1.5%]">
        {{ $t('company.certificatesTitle') }}
      </h3>
      <!-- <Btn color="icon">
        <Icon name="plus" class="size-5 text-success-100" />
      </Btn> -->
    </div>
    <div>
      <div class="grid grid-cols-4">
        <div
          v-for="(certificate, certificateIndex) in certificates"
          class="col-span-1"
        >
          <div class="h-px w-full bg-secondary-300"></div>
          <div class="py-5 flex items-center justify-between">
            <div class="space-y-1">
              <h4 class="text-base font-medium leading-5 tracking-[1.5%]">
                {{ certificate.file_name }}
              </h4>
            </div>
            <div class="flex items-center">
              <Btn color="icon" class="mr-3">
                <a :href="certificate.file" target="_blank">
                  <Icon name="eye-open" class="size-5 text-info-100" />
                </a>
              </Btn>
              <Btn
                color="icon"
                class="mr-3"
                @click="downloadFile(certificate.file)"
              >
                <Icon name="download" class="size-5 text-success-100" />
              </Btn>
              <!-- <Btn color="icon">
                <Icon name="delete" class="size-5 text-danger-100" />
              </Btn> -->
              <div
                class="w-px h-10 mx-5 bg-secondary-300"
                v-if="(certificateIndex + 1) % 4 !== 0"
              ></div>
            </div>
          </div>
          <div class="h-px w-full bg-secondary-300"></div>
        </div>
      </div>
    </div>
  </div>
</template>
