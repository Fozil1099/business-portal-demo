import { onBeforeUnmount, ref, watch, type MaybeRefOrGetter, toValue } from "vue";
import { getPhotoBlob } from "../api/photo";

export const usePhotoUrl = (source: MaybeRefOrGetter<string | null | undefined>) => {
  const url = ref<string | null>(null);

  const revoke = () => {
    if (url.value) URL.revokeObjectURL(url.value);
    url.value = null;
  };

  watch(
    () => toValue(source),
    async (photoUrl) => {
      revoke();
      if (!photoUrl) return;
      try {
        url.value = URL.createObjectURL(await getPhotoBlob(photoUrl));
      } catch {
        url.value = null;
      }
    },
    { immediate: true },
  );

  onBeforeUnmount(revoke);

  return url;
};
