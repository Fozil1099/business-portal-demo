import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

export const toastify = Vue3Toastify;
export const toastOptions: ToastContainerOptions = {
  autoClose: 3000,
  theme: "dark",
  transition: "slide",
  position: "top-right",
  pauseOnHover: true,
} as ToastContainerOptions;
