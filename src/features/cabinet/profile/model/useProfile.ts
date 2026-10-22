import { ref } from "vue";
import { getCurrentUser, updateProfile } from "../api/profile";
import type { UserProfile } from "../api/types";

export const useProfile = () => {
  const profile = ref<UserProfile | null>(null);
  const isLoading = ref(false);
  const isUpdating = ref(false);

  const fetchProfile = async () => {
    isLoading.value = true;

    try {
      const { data } = await getCurrentUser();
      profile.value = data;
    } finally {
      isLoading.value = false;
    }
  };

  const handleUpdatePhones = async (phones: string[]) => {
    isUpdating.value = true;

    try {
      const { data } = await updateProfile({ phone_numbers: phones });
      profile.value = data;
      return data;
    } finally {
      isUpdating.value = false;
    }
  };

  return {
    profile,
    isLoading,
    fetchProfile,
    handleUpdatePhones,
    isUpdating,
  };
};
