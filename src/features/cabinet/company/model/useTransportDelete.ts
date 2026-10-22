import { ref } from "vue";
import { deleteCar } from "../api/company";
import type { CompanyCar } from "../api/types";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";
import { modal } from "@/shared/ui/Modals/Directives";
import { getUserData } from "@/shared/utils/auth";

export const useTransportDelete = () => {
  const { t } = useI18n();
  const selectedCar = ref<CompanyCar | undefined>();
  const isDeleting = ref(false);

  const handleConfirmDelete = (car: CompanyCar) => {
    selectedCar.value = car;
    modal("transport-delete-modal").show();
  };

  const handleDelete = async (onSuccess?: () => void) => {
    const userData = getUserData();

    if (!userData?.company_id || !selectedCar.value) {
      toast.error(t("errors.noCompany"));
      return;
    }

    isDeleting.value = true;
    await deleteCar(userData.company_id, selectedCar.value.id);
    modal("transport-delete-modal").hide();
    selectedCar.value = undefined;
    onSuccess?.();
    isDeleting.value = false;
  };

  return {
    selectedCar,
    isDeleting,
    handleConfirmDelete,
    handleDelete,
  };
};
