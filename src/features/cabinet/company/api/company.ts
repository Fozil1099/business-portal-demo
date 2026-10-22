import { http } from "@/app/providers/axios/http";
import type {
  CompanyDetail,
  UpdateCompanyPayload,
  CreateCarPayload,
  CompanyCar,
} from "./types";
import { changeToFormData } from "@/shared/utils/formatter";
import type { CompanyPk } from "@/shared/types";

export const getCompany = (uuid: CompanyPk) => {
  return http.get<CompanyDetail>(`/companies/${uuid}/`);
};

export const updateCompany = (uuid: CompanyPk, data: UpdateCompanyPayload) => {
  return http.patch<CompanyDetail>(`/companies/${uuid}/`, data);
};

export const uploadCompanyLogo = (uuid: CompanyPk, file: File) => {
  return http.post<CompanyDetail>(
    `/companies/${uuid}/logo/`,
    changeToFormData({ file }),
  );
};

export const createCar = (companyId: CompanyPk, data: CreateCarPayload) => {
  return http.post<CompanyCar>(`/companies/${companyId}/cars/`, data);
};

export const updateCar = (
  companyId: CompanyPk,
  carId: number,
  data: CreateCarPayload,
) => {
  return http.patch<CompanyCar>(`/companies/${companyId}/cars/${carId}/`, data);
};

export const deleteCar = (companyId: CompanyPk, carId: number) => {
  return http.delete(`/companies/${companyId}/cars/${carId}/`);
};
