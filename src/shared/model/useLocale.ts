import { useI18n } from "vue-i18n";
import { computed } from "vue";
import type { Lang } from "@/shared/types";

const LOCALE_STORAGE_KEY = import.meta.env.VITE_LOCALE_STORAGE_KEY || "locale";

export const useLocale = () => {
  const { locale } = useI18n();
  const localeKey = computed<keyof Lang>(() => locale.value as keyof Lang);

  const saveLocale = (newLocale: string) => {
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
  };

  const setLocaleFromStorage = () => {
    locale.value = localStorage.getItem(LOCALE_STORAGE_KEY) || locale.value;
  };

  return {
    setLocaleFromStorage,
    saveLocale,
    localeKey,
  };
};
