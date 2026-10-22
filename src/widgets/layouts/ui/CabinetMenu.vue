<script lang="ts" setup>
import { Icon } from "@/shared/ui";
import type { IconName } from "@/shared/ui/Icon/types";

const menuItems: { name: string; icon: IconName; path: string }[] = [
  {
    name: "navigation.dashboard",
    icon: "squares",
    path: "/cabinet/dashboard",
  },
  {
    name: "navigation.services",
    icon: "circles",
    path: "/cabinet/services",
  },
  {
    name: "navigation.profile",
    icon: "profile",
    path: "/cabinet/profile",
  },
  {
    name: "navigation.company",
    icon: "building",
    path: "/cabinet/company",
  },
  {
    name: "navigation.employees",
    icon: "users",
    path: "/cabinet/employees",
  },
  {
    name: "navigation.notifications",
    icon: "bell",
    path: "/cabinet/notifications",
  },
];
</script>

<template>
  <div>
    <RouterLink
      v-for="value in menuItems"
      :to="value.path"
      class="flex gap-2 align-items-center p-3 rounded-lg"
      active-class="bg__gray__gradient text-white"
    >
      <Icon :name="value.icon" class="size-6 text-success-100" />
      <span class="font-medium text-base leading-5">{{ $t(value.name) }}</span>
    </RouterLink>
  </div>
</template>
  