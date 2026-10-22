import { ref, onMounted } from "vue";
import { getCompany } from "../api/company";
import type { CompanyDetail } from "../api/types";
import { getUserData } from "@/shared/utils/auth";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

export const useCompany = () => {
  const { t } = useI18n();
  const company = ref<CompanyDetail>();

  const fetchCompany = async () => {
    const userData = getUserData();

    if (!userData?.company_id) {
      // If the user has no company_id, we can't fetch company data.
      toast.warn(t("errors.noCompany"));
      return;
    }

    const { data } = await getCompany(userData.company_id);
    company.value = data;
  };

  onMounted(() => {
    fetchCompany();
  });

  return {
    company,
    fetchCompany,
  };
};
