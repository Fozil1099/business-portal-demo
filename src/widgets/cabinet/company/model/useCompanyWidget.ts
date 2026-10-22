import { computed } from "vue";
import { useI18n } from "vue-i18n";
import type {
  CompanyCar,
  CompanyDetail,
} from "@/features/cabinet/company";
import { formatPhoneNumber } from "@/shared/utils/formatter";

export const useCompanyWidget = (
  getCompany: () => CompanyDetail | undefined = () => undefined,
) => {
  const { t } = useI18n();

  const display = (value: string | null | undefined) => value || "—";

  const personalData = computed(() => {
    const company = getCompany();
    const phones = (company?.phone_numbers ?? []).map((phone) =>
      formatPhoneNumber(phone),
    );

    return [
      {
        label: t("company.nameLabel"),
        key: "name",
        value: display(company?.name),
        span: 2,
      },
      {
        label: t("company.legalAddressLabel"),
        key: "legal_location",
        value: display(company?.legal_location),
        span: 2,
      },
      {
        label: t("company.actualAddressLabel"),
        key: "current_location",
        value: display(company?.current_location),
        span: 2,
      },
      {
        label: t("company.tinLabel"),
        key: "tin",
        value: display(company?.tin),
        span: 1,
      },
      {
        label: t("company.okedLabel"),
        key: "le_tin",
        value: display(company?.le_tin),
        span: 1,
      },
      {
        label: t("company.directorLabel"),
        key: "director",
        value: display(company?.director?.full_name),
        span: 2,
      },
      {
        label: t("company.regionLabel"),
        key: "region",
        value: display(company?.region),
        span: 2,
      },
      {
        label: t("company.cityLabel"),
        key: "city",
        value: display(company?.city),
        span: 2,
      },
      {
        label: t("company.districtLabel"),
        key: "district",
        value: display(company?.district),
        span: 2,
      },
      {
        label: t("company.phoneLabel"),
        key: "phone_numbers",
        value: phones.length ? phones : ["—"],
        span: "full",
      },
    ];
  });

  const transportData = computed(() => [
    { label: t("transport.carBrandLabel"), key: "name" as keyof CompanyCar },
    { label: t("transport.numberLabel"), key: "number" as keyof CompanyCar },
    {
      label: t("transport.passportLabel"),
      key: "serial_number" as keyof CompanyCar,
    },
  ]);

  return {
    transportData,
    personalData,
  };
};
