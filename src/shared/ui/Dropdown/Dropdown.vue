<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from "vue";
import { getCurrentInstance } from "vue";

const instance = getCurrentInstance();

interface Props {
  dropdownClass?: string;
  position?: "bottom-right" | "bottom-center" | "right-bottom";
}

withDefaults(defineProps<Props>(), {
  position: "bottom-right",
});
let isDropdownHidden = ref(true);

const closeDropdown = (event: PointerEvent) => {
  const dropdown = document.querySelector("#dropdown-" + instance?.uid);
  // Если клик был вне .dropdown → закрываем
  if (dropdown && !dropdown.contains(event.target as HTMLElement)) {
    isDropdownHidden.value = true;
  }
};

const handleDropdown = () => {
  isDropdownHidden.value = !isDropdownHidden.value;
};

onMounted(() => {
  document.addEventListener("click", closeDropdown);
});

onUnmounted(() => {
  document.removeEventListener("click", closeDropdown);
});
</script>

<template>
  <div class="relative" :id="`dropdown-${instance?.uid}`">
    <slot name="button" :actions="{ handleDropdown }"></slot>

    <div
      :class="[
        isDropdownHidden ? 'hidden' : 'block dropdown--open',
        dropdownClass,
        {
          'bottom-right': 'top-[calc(100%+12px)] right-0 origin-top-right',
          'bottom-center':
            'top-[calc(100%+12px)] right-1/2 translate-x-1/2 origin-top',
          'right-bottom': 'right-[calc(100%+12px)] top-0 origin-top-right',
        }[position],
      ]"
      class="absolute z-50 dropdown min-w-max rounded-2xl bg-white p-1.5 ring-1 ring-black/5 shadow-[0_16px_40px_-12px_rgba(18,18,18,0.25)]"
    >
      <slot name="body" :actions="{ handleDropdown }"></slot>
    </div>
  </div>
</template>

<style lang="scss">
.dropdown--open {
  animation: dropdownIn 0.15s ease-out;
}

@keyframes dropdownIn {
  from {
    opacity: 0;
    scale: 0.96;
  }
  to {
    opacity: 1;
    scale: 1;
  }
}
</style>
