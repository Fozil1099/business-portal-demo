import { ref, watch } from "vue";
import { updateCompany, uploadCompanyLogo } from "../api/company";
import type { CompanyDetail } from "../api/types";
import type { CompanyEditableKey } from "./constants";

type CompanyInfoForm = Record<CompanyEditableKey, string> & {
  phone_numbers: string[];
  logo: File | string | null;
};

const toForm = (company?: CompanyDetail): CompanyInfoForm => ({
  legal_location: company?.legal_location ?? "",
  current_location: company?.current_location ?? "",
  phone_numbers: company?.phone_numbers?.length
    ? [...company.phone_numbers]
    : [""],
  logo: company?.logo ?? null,
});

export const useCompanyInfoModal = (props: { company?: CompanyDetail }) => {
  const isSubmitting = ref(false);
  const form = ref<CompanyInfoForm>(toForm(props.company));

  const resetForm = () => {
    form.value = toForm(props.company);
  };

  watch(() => props.company, resetForm);

  // Название, ИНН, регион и т.д. приходят из SSO и только для чтения
  const getReadonlyValue = (key: keyof CompanyDetail) => {
    const value = props.company?.[key];
    return typeof value === "string" ? value : "";
  };

  const handleSave = async (onSuccess?: () => void) => {
    if (!props.company) return;

    isSubmitting.value = true;

    try {
      const { uuid } = props.company;

      await updateCompany(uuid, {
        legal_location: form.value.legal_location.trim() || null,
        current_location: form.value.current_location.trim() || null,
        phone_numbers: form.value.phone_numbers
          .map((phone) => phone.replace(/\D/g, ""))
          .filter(Boolean),
      });

      if (form.value.logo instanceof File) {
        await uploadCompanyLogo(uuid, form.value.logo);
      }

      onSuccess?.();
    } finally {
      isSubmitting.value = false;
    }
  };

  const addPhoneField = () => {
    form.value.phone_numbers.push("");
  };

  const removePhoneField = (index: number) => {
    if (form.value.phone_numbers.length > 1) {
      form.value.phone_numbers.splice(index, 1);
    }
  };

  return {
    form,
    isSubmitting,
    getReadonlyValue,
    resetForm,
    handleSave,
    addPhoneField,
    removePhoneField,
  };
};
