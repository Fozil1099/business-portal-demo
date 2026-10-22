<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { modal } from "./Directives";
import { useI18n } from "vue-i18n";
import { Btn, Icon, LoaderAnimation } from "..";

interface Props {
  id: string;
  title?: string;
  cancel?: string;
  ok?: string;
  okClass?: string;
  cancelClass?: string;
  okDisabled?: boolean;
  cancelDisabled?: boolean;
  cancelHidden?: boolean;
  okHidden?: boolean;
  size?: string;
  footerHidden?: boolean;
  class?: string;
  loginModal?: boolean;
  noBody?: boolean;
  loading?: boolean;
  loader?: boolean;
}

interface Emits {
  (event: "ok"): void;
  (event: "cancel"): void;
  (event: "show"): void;
  (event: "hide"): void;
  (event: "xClose"): void;
}

const props = withDefaults(defineProps<Props>(), {
  cancel: "Cancel",
  ok: "Ok",
  size: "max-w-2xl",
  loader: false,
});

const emit = defineEmits<Emits>();
const { t } = useI18n();

const modalElement = ref<HTMLElement | null>(null);

const padding = computed(() => (props.loginModal ? "p-4" : "p-5 md:p-10"));

const bodyClasses = computed(() => ({
  "px-5 md:px-10": !props.loginModal,
  "pb-5 md:pb-10": props.footerHidden && !props.loginModal,
  "p-0!": props.noBody,
}));

const closeModal = () => {
  modal(props.id).hide();
  emit("xClose");
};

const handleCancel = () => {
  emit("cancel");
  modal(props.id).hide();
};

onMounted(() => {
  modalElement.value = document.getElementById(props.id);
  if (!modalElement.value) return;

  const element = modalElement.value as any;
  element.show = () => emit("show");
  element.hide = () => emit("hide");
});
</script>

<template>
  <div :id="id" class="hide">
    <div
      class="overflow-y-auto overflow-x-hidden fixed flex top-0 right-0 left-0 z-150 justify-center items-center w-full md:inset-0 h-full max-h-full"
      style="background: rgba(0, 0, 0, 0.6)"
      @click="closeModal"
    >
      <div
        class="modal-container relative p-4 w-full max-h-full"
        :class="size"
        @click.stop
      >
        <!-- Modal content -->
        <div
          class="relative rounded-[32px] md:rounded-[40px] border-8 md:border-15 border-white/25 backdrop-blur-[20px]"
        >
          <button
            v-if="loginModal"
            type="button"
            class="absolute right-0 -top-12 md:-right-10 md:-top-10 z-999 cursor-pointer"
            @click="closeModal"
          >
            <Icon name="x" class="size-9 text-white" />
            <span class="sr-only">Close modal</span>
          </button>
          <div
            class="bg-white rounded-[24px] md:rounded-[25px] relative overflow-hidden"
            :class="props.class"
          >
            <!-- Loader Overlay -->
            <div
              v-if="loader"
              class="absolute inset-0 bg-white/80 backdrop-blur-sm z-999 flex items-center justify-center rounded-[25px]"
            >
              <LoaderAnimation />
            </div>

            <!-- Modal header -->
            <div
              v-if="title"
              class="flex items-center justify-between rounded-t"
              :class="padding"
            >
              <h3 class="text-xl font-semibold text-dark tracking-[1.5%]">
                {{ t(title) }}
              </h3>

              <button
                v-if="!loginModal"
                type="button"
                class="cursor-pointer"
                @click="closeModal"
              >
                <Icon name="x" class="size-6 text-black" />
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <!-- Modal body -->
            <div :class="bodyClasses">
              <slot />
            </div>
            <!-- Modal footer -->
            <div
              v-if="!footerHidden"
              class="flex items-center rounded-b gap-3"
              :class="padding"
            >
              <Btn
                v-if="!cancelHidden"
                type="button"
                color="outline"
                :class="cancelClass"
                class="w-full"
                :disabled="cancelDisabled"
                @click="handleCancel"
              >
                {{ t(cancel) }}
              </Btn>
              <Btn
                v-if="!okHidden"
                type="button"
                color="primary"
                :disabled="okDisabled"
                :class="okClass"
                class="w-full"
                @click="emit('ok')"
              >
                {{ t(ok) }}
              </Btn>
            </div>
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.modal-container {
  animation: openModal 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
}

.hide {
  .modal-container {
    animation: closeModal 0.3s cubic-bezier(0.165, 0.84, 0.44, 1) forwards;
  }
  transition: 0.2s all;
  visibility: hidden;
}

@keyframes openModal {
  0% {
    transform: scale(0.8);
    scale: 0;
  }
  100% {
    transform: scale(1);
    scale: 1;
  }
}

@keyframes closeModal {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
