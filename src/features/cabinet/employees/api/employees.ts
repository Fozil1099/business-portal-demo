import { http } from "@/app/providers/axios/http";
import type {
  Employee,
  EmployeeCreatePayload,
  EmployeeList,
  EmployeeListParams,
  EmployeeUpdatePayload,
} from "./types";

export const getEmployees = (params?: EmployeeListParams) => {
  return http.get<EmployeeList>("/users/employees/", { params });
};

export const createEmployee = (data: EmployeeCreatePayload) => {
  return http.post<Employee>("/users/employees/", data);
};

export const updateEmployee = (uuid: string, data: EmployeeUpdatePayload) => {
  return http.patch<Employee>(`/users/employees/${uuid}/`, data);
};

export const deleteEmployee = (uuid: string) => {
  return http.delete<null>(`/users/employees/${uuid}/`);
};
