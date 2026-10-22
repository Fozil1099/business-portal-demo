import { computed, ref, shallowRef, watch } from "vue";
import { modal } from "@/shared/ui";
import {
  isCompanySelectionRequired,
  useAuth,
  type AuthData,
} from "@/features/auth";
import { isAxiosError } from "axios";
import type { AuthCompany } from "@/shared/types";

export const useLoginModal = () => {
  const { login, selectCompany, saveSession } = useAuth();
  const username = ref("");
  const password = ref("");
  const isSubmitting = ref(false);

  // Set when login answers COMPANY_SELECTION_REQUIRED. Nothing is saved
  // until the company is confirmed via select-company: until then the user
  // is not authorized.
  const selectionToken = shallowRef<string | null>(null);
  const companies = ref<AuthCompany[]>([]);
  const selectedCompany = ref<AuthCompany | null>(null);

  const hasCompanies = computed(() => companies.value.length > 0);

  const canSubmit = computed(
    () =>
      Boolean(username.value.trim() && password.value) &&
      (!hasCompanies.value || Boolean(selectedCompany.value)),
  );

  const resetCompanyStep = () => {
    selectionToken.value = null;
    companies.value = [];
    selectedCompany.value = null;
  };

  watch([username, password], resetCompanyStep);

  const finishLogin = (data: AuthData, company: AuthCompany | null) => {
    saveSession(data, company);
    modal("login-modal").hide();
    window.location.reload();
  };

  const confirmCompany = async (token: string, company: AuthCompany) => {
    try {
      const { data } = await selectCompany({
        selection_token: token,
        company: company.uuid,
      });
      finishLogin(data, company);
    } catch (error) {
      // The selection token is short-lived: start over with a fresh login
      resetCompanyStep();
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!canSubmit.value || isSubmitting.value) return;

    isSubmitting.value = true;
    try {
      if (selectionToken.value && selectedCompany.value) {
        await confirmCompany(selectionToken.value, selectedCompany.value);
        return;
      }

      const { data } = await login({
        username: username.value.trim(),
        password: password.value,
      });

      if (!isCompanySelectionRequired(data)) {
        finishLogin(data, null);
        return;
      }

      selectionToken.value = data.selection_token;
      companies.value = data.companies;
      selectedCompany.value =
        data.companies.length === 1 ? (data.companies[0] ?? null) : null;
    } catch (error) {
      // HTTP error toasts are shown by the response interceptor
      if (!isAxiosError(error)) {
        console.error(error);
      }
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    username,
    password,
    isSubmitting,
    canSubmit,
    companies,
    selectedCompany,
    hasCompanies,
    handleSubmit,
  };
};
