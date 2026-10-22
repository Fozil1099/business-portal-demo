<script lang="ts" setup>
import { Modal, BaseInput, Btn, Select } from "@/shared/ui";
import { useLoginModal } from "@/widgets/navbar/model";

const {
  username,
  password,
  isSubmitting,
  canSubmit,
  companies,
  selectedCompany,
  hasCompanies,
  handleSubmit,
} = useLoginModal();
</script>

<template>
  <Modal
    id="login-modal"
    class="px-5 py-8 md:p-25"
    size="max-w-[550px]"
    footerHidden
    loginModal
  >
    <form
      class="text-center space-y-8 md:space-y-10"
      @submit.prevent="handleSubmit"
    >
      <h1
        class="text-2xl leading-8 md:text-[28px] md:leading-[34px] font-bold tracking-[1.5%]"
      >
        {{ $t("common.loginToAccount") }}
      </h1>
      <div class="space-y-5">
        <BaseInput
          v-model="username"
          icon="profile"
          :placeholder="$t('auth.loginPlaceholder')"
          class="w-full"
          :disabled="isSubmitting"
        />
        <BaseInput
          v-model="password"
          icon="password"
          :placeholder="$t('auth.passwordPlaceholder')"
          type="password"
          class="w-full"
          :disabled="isSubmitting"
        />
        <Select
          v-if="hasCompanies"
          v-model="selectedCompany"
          icon="building"
          label="name"
          :options="companies"
          :placeholder="$t('auth.companyPlaceholder')"
          :clearable="false"
          :disabled="isSubmitting"
          :close-on-select="true"
          class="text-left"
        />
      </div>
      <div class="space-y-3">
        <Btn
          :color="canSubmit ? 'primary' : 'gray-light'"
          block
          type="submit"
          :disabled="!canSubmit || isSubmitting"
        >
          {{ $t("common.login") }}
        </Btn>
        <Btn color="blue" block type="button">
          <img
            src="@/shared/assets/images/sso.svg"
            alt="sso"
            class="size-6"
          />
          {{ $t("auth.loginWithSso") }}
        </Btn>
      </div>
    </form>
  </Modal>
</template>
