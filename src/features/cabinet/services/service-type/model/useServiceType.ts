import { ref } from "vue";
import { getCompanyCriteriaScore } from "../api/serviceTypeApi";
import type { CriterionScore } from "../api/types";
import { getUserData } from "@/shared/utils/auth";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

export const useServiceType = () => {
  const { t } = useI18n();
  const serviceTypes = ref<CriterionScore[]>([]);
  const isLoading = ref(false);

  const fetchServiceTypes = async () => {
    const companyUuid = getUserData()?.company_id;
    if (!companyUuid) {
      // If the user has no company_id, we can't fetch service types.
      toast.warn(t("errors.noCompany"));
      return;
    }

    isLoading.value = true;

    try {
      const { data } = await getCompanyCriteriaScore(companyUuid);
      serviceTypes.value = data.criteria;
    } catch {
      serviceTypes.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    serviceTypes,
    isLoading,
    fetchServiceTypes,
  };
};
