<script lang="ts" setup>
import { InfoController, Loader } from "@/shared/ui";
import { EditPhoneModal, ChangePasswordModal } from "@/features/cabinet/profile";
import { useProfileWidget } from "../model/useProfileWidget";

const {
  personalData,
  isLoading,
  onChangePassword,
  onEditPhone,
  onSavePhones,
  profile,
} = useProfileWidget();
</script>

<template>
  <Loader :isLoading="isLoading" :data="personalData">
    <div class="card space-y-5">
      <h3 class="text-xl font-semibold leading-6 tracking-[1.5%]">
        {{ $t('profile.personalDataTitle') }}
      </h3>
      <div class="grid grid-cols-4 gap-5">
        <div
          v-for="item in personalData"
          :key="item.label"
          :class="`col-span-${item.span}`"
        >
          <InfoController
            :item="item"
            phone-edit
            @edit="onEditPhone"
            @refresh="onChangePassword"
          />
        </div>
      </div>
    </div>
  </Loader>

  <ChangePasswordModal />

  <!-- Modal для редактирования телефонов -->
  <EditPhoneModal
    :initial-phones="profile?.phone_numbers || []"
    @save="onSavePhones"
  />
</template>
