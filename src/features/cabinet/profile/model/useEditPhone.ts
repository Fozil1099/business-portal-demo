import { ref, watch } from "vue";

export const useEditPhone = (
  props: { initialPhones?: string[] },
  emit: (event: "save", phones: string[]) => void,
) => {
  const phoneNumbers = ref<string[]>([""]);

  watch(
    () => props.initialPhones,
    (newPhones) => {
      if (newPhones && newPhones.length > 0) {
        phoneNumbers.value = [...newPhones];
      } else {
        phoneNumbers.value = [""];
      }
    },
    { immediate: true },
  );

  const addPhoneField = () => {
    phoneNumbers.value.push("");
  };

  const removePhoneField = (index: number) => {
    if (phoneNumbers.value.length > 1) {
      phoneNumbers.value.splice(index, 1);
    }
  };

  const handleSave = () => {
    const validPhones = phoneNumbers.value
      .map((phone) => phone.replace(/\D/g, ""))
      .filter(Boolean);

    emit("save", validPhones);
  };

  return {
    phoneNumbers,
    addPhoneField,
    removePhoneField,
    handleSave,
  };
};
