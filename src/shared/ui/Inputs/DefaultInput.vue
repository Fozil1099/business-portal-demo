<script lang="ts" setup>
import { getCurrentInstance, ref, onMounted } from "vue";
import { Icon } from "@/shared/ui";
import type { IconName } from "@/shared/ui/Icon/types";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  inputClass?: string;
  icon?: IconName;
  type?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: "text",
});

const { uid } = getCurrentInstance()!;
const model = defineModel<string>({
  default: "",
});
let inputType = ref<string>("");

const focusToInput = () => {
  const input = document.getElementById(`tag-input-${uid}`) as HTMLInputElement;
  if (input) {
    input.focus();
  }
};
onMounted(() => {
  inputType.value = props.type;
});
</script>

<template>
  <div
    class="py-[11px] px-[15px] bg-black/10 flex items-center gap-2.5 overflow-auto custom-scrollbar rounded-[8px] relative border-[0.5px] border-white/15"
    :class="props.type == 'password' ? 'pr-9' : ''"
    @click="focusToInput"
  >
    <Icon
      v-if="icon"
      :name="icon"
      class="size-6 text-secondary-300 mr-1"
      :class="{
        'text-success-100': model,
      }"
    />
    <slot v-else />
    <input
      :id="`input-${uid}`"
      v-model="model"
      :type="inputType"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClass"
      class="default-input border-none w-full bg-transparent focus-visible:outline-none text-white font-normal text-sm tracking-[0.1px] min-w-[100px]"
    />
    <div
      v-if="props.type == 'password'"
      class="absolute right-3 top-[50%] translate-y-[-50%]"
    >
      <div
        v-if="inputType == 'password'"
        @click="inputType = 'text'"
        class="cursor-pointer"
      >
        <Icon name="eye" />
      </div>
      <div v-else @click="inputType = 'password'" class="cursor-pointer">
        <Icon name="eye-open" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.default-input {
  &::placeholder {
    @apply text-sm font-normal text-white/20 tracking-[0.1px];
  }
}
</style>
