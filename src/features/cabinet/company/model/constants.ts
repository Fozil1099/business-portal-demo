import type { IconName } from "@/shared/ui/Icon/types";
import type { CompanyDetail } from "../api/types";

export type CompanyEditableKey = "legal_location" | "current_location";

export const formInputs: {
  labelKey: string;
  placeholderKey: string;
  icon: IconName;
  key: keyof CompanyDetail;
  editable?: CompanyEditableKey;
  cols?: number;
}[] = [
  {
    labelKey: "company.nameLabel",
    placeholderKey: "company.namePlaceholder",
    icon: "building",
    key: "name",
  },
  {
    labelKey: "company.tinLabel",
    placeholderKey: "company.tinPlaceholder",
    icon: "file",
    key: "tin",
  },
  {
    labelKey: "company.okedLabel",
    placeholderKey: "company.okedPlaceholder",
    icon: "file",
    key: "le_tin",
  },
  {
    labelKey: "company.abbreviationLabel",
    placeholderKey: "company.abbreviationPlaceholder",
    icon: "building",
    key: "acron_uz",
  },
  {
    labelKey: "company.legalAddressLabel",
    placeholderKey: "company.legalAddressPlaceholder",
    icon: "location",
    key: "legal_location",
    editable: "legal_location",
  },
  {
    labelKey: "company.actualAddressLabel",
    placeholderKey: "company.actualAddressPlaceholder",
    icon: "location",
    key: "current_location",
    editable: "current_location",
  },
  {
    labelKey: "company.regionLabel",
    placeholderKey: "company.regionPlaceholder",
    icon: "location",
    key: "region",
  },
  {
    labelKey: "company.cityLabel",
    placeholderKey: "company.cityPlaceholder",
    icon: "location",
    key: "city",
  },
  {
    labelKey: "company.districtLabel",
    placeholderKey: "company.districtPlaceholder",
    icon: "location",
    key: "district",
  },
];
