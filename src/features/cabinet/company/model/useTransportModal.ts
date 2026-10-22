import { ref, computed, watch } from "vue";
import { createCar, updateCar } from "../api/company";
import type { CompanyCar, CreateCarPayload } from "../api/types";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import { modal } from "@/shared/ui/Modals/Directives";
import { getUserData } from "@/shared/utils/auth";

export const useTransportModal = (props: { car?: CompanyCar }) => {
  const { t } = useI18n();
  const isSubmitting = ref(false);

  const form = ref<CreateCarPayload>({
    name: "",
    number: "",
    serial_number: "",
  });

  const resetForm = () => {
    form.value = {
      name: "",
      number: "",
      serial_number: "",
    };
  };

  watch(
    () => props.car,
    (car) => {
      if (car) {
        form.value = {
          name: car.name,
          number: car.number,
          serial_number: car.serial_number,
        };
      } else {
        resetForm();
      }
    },
    { immediate: true },
  );

  const isFormValid = computed(() => {
    return (
      form.value.name.trim() !== "" &&
      form.value.number.trim() !== "" &&
      form.value.serial_number.trim() !== ""
    );
  });

  const handleSave = async (onSuccess?: () => void) => {
    const userData = getUserData();

    if (!userData?.company_id) {
      toast.error(t("errors.noCompany"));
      return;
    }

    isSubmitting.value = true;
    if (props.car?.id) {
      await updateCar(userData.company_id, props.car.id, form.value);
    } else {
      await createCar(userData.company_id, form.value);
    }
    modal("transport-modal").hide();
    resetForm();
    onSuccess?.();
    isSubmitting.value = false;
  };

  return {
    form,
    isSubmitting,
    handleSave,
    resetForm,
    isFormValid,
  };
};
