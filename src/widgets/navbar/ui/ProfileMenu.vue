<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Avatar, Btn, Dropdown, DropdownItem } from "@/shared/ui";
import { useAuth } from "@/features/auth";
import { getUserData } from "@/shared/utils/auth";

const router = useRouter();
const { logout } = useAuth();

const userData = getUserData();
const fullName =
  [userData?.first_name, userData?.last_name].filter(Boolean).join(" ") ||
  userData?.username;
const subtitle = userData?.company?.name || userData?.email || userData?.username;

const goToCabinet = (handleDropdown: () => void) => {
  handleDropdown();
  router.push({ name: "cabinet-services" });
};

const handleLogout = () => {
  logout();
  // Full reload: login state is read from cookies, not from reactive state
  window.location.assign("/");
};
</script>

<template>
  <Dropdown position="bottom-right">
    <template #button="{ actions }">
      <Btn
        color="icon"
        class="rounded-full! ring-2 ring-transparent hover:ring-success-100/30 transition-shadow"
        :title="fullName"
        @click="actions.handleDropdown"
      >
        <Avatar :name="fullName" />
      </Btn>
    </template>
    <template #body="{ actions }">
      <div class="w-64">
        <div class="flex items-center gap-3 px-2.5 pt-2 pb-3">
          <Avatar :name="fullName" size="sm" />
          <div class="min-w-0">
            <p class="truncate text-sm font-semibold text-dark">
              {{ fullName }}
            </p>
            <p
              v-if="subtitle && subtitle !== fullName"
              class="truncate text-xs text-secondary-400"
            >
              {{ subtitle }}
            </p>
          </div>
        </div>
        <div class="mx-1 mb-1.5 h-px bg-secondary-200" />
        <DropdownItem
          :title="$t('common.loginToAccount')"
          icon="squares"
          @click="goToCabinet(actions.handleDropdown)"
        />
        <DropdownItem
          :title="$t('auth.logout')"
          icon="exit"
          variant="danger"
          @click="handleLogout"
        />
      </div>
    </template>
  </Dropdown>
</template>
