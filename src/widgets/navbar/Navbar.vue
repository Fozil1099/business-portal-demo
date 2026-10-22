<script lang="ts" setup>
import { ref, useTemplateRef, watch } from "vue";
import { onClickOutside } from "@vueuse/core";
import { Btn, Icon, modal } from "@/shared/ui";
import LocaleSelect from "./ui/LocaleSelect.vue";
import Nav from "./ui/Nav.vue";
import ProfileMenu from "./ui/ProfileMenu.vue";
import LoginModal from "@/widgets/navbar/ui/LoginModal.vue";
import { useRoute, useRouter } from "vue-router";
import { isUserLoggedIn } from "@/shared/utils/auth";

const router = useRouter();
const route = useRoute();

// Mobile menu (below lg the nav links are hidden behind a burger button)
const isMenuOpen = ref(false);
const navbarRef = useTemplateRef<HTMLElement>("navbar");

onClickOutside(navbarRef, () => (isMenuOpen.value = false));
watch(
  () => route.fullPath,
  () => (isMenuOpen.value = false),
);

const openLogin = () => {
  isMenuOpen.value = false;
  modal("login-modal").show();
};
</script>

<template>
  <div
    ref="navbar"
    class="bg-secondary-200 sticky top-3 lg:top-5 py-3 px-3 sm:px-4 lg:py-[22px] lg:px-10 rounded-2xl flex items-center justify-between gap-2 z-100"
  >
    <div
      class="flex items-center gap-1.5 min-w-0 cursor-pointer"
      @click="router.push('/')"
    >
      <img
        src="@shared/assets/icons/logo.svg"
        class="size-8 shrink-0 lg:size-auto"
        alt=""
      />
      <!-- On the narrowest phones only the logo fits next to the controls -->
      <span
        class="font-bold text-[15px] sm:text-lg lg:text-xl truncate max-[359px]:hidden"
      >
        {{ $t("brand.name") }}
      </span>
    </div>
    <Nav class="hidden! lg:flex!" />
    <div class="flex items-center gap-1.5 sm:gap-2 lg:gap-3 shrink-0">
      <LocaleSelect />
      <ProfileMenu v-if="isUserLoggedIn()" />
      <div v-else class="hidden lg:block">
        <Btn @click="openLogin">{{ $t("common.loginToAccount") }}</Btn>
      </div>
      <Btn
        color="icon"
        class="lg:hidden! size-9 sm:size-10 rounded-xl! bg-white!"
        :aria-label="$t('common.menu')"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <Icon :name="isMenuOpen ? 'x' : 'menu'" class="size-6 text-dark" />
      </Btn>
    </div>

    <Transition name="menu">
      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-full left-0 right-0 mt-2 bg-secondary-200 rounded-2xl p-5 space-y-5 shadow-lg"
      >
        <Nav vertical />
        <Btn v-if="!isUserLoggedIn()" block @click="openLogin">
          {{ $t("common.loginToAccount") }}
        </Btn>
      </div>
    </Transition>
  </div>
  <LoginModal />
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
