import { ref, onMounted } from "vue";
import { getEmployees, deleteEmployee } from "../api/employees";
import type { Employee, EmployeeList } from "../api/types";
import type { ResponsePagination } from "@/shared/types";
import { modal } from "@/shared/ui";

const PAGE_SIZE = 20;

const emptyPagination = (): ResponsePagination => ({
  total_items: 0,
  total_pages: 1,
  current_page: 1,
  page_size: PAGE_SIZE,
  next_page: null,
  prev_page: null,
});

export const useEmployees = () => {
  const employees = ref<EmployeeList>({
    results: [],
    pagination: emptyPagination(),
  });
  const isLoading = ref(false);
  const isInitialLoading = ref(false);

  // DELETE только деактивирует сотрудника, поэтому показываем активных
  const fetchEmployees = async (isInitial = true) => {
    const nextPage = employees.value.pagination.next_page;
    if (!isInitial && !nextPage) return;

    isLoading.value = true;
    isInitialLoading.value = isInitial;

    try {
      const { data } = await getEmployees({
        is_active: true,
        page: isInitial ? 1 : nextPage!,
        page_size: PAGE_SIZE,
      });

      if (isInitial) {
        employees.value = data;
      } else {
        employees.value.results.push(...data.results);
        employees.value.pagination = data.pagination;
      }
    } catch {
      if (isInitial) {
        employees.value = { results: [], pagination: emptyPagination() };
      }
    } finally {
      isLoading.value = false;
      isInitialLoading.value = false;
    }
  };

  const loadMore = () => fetchEmployees(false);

  const selectedEmployeeToDelete = ref<Employee | undefined>();
  const isDeleting = ref(false);

  const handleConfirmDelete = (employee: Employee) => {
    selectedEmployeeToDelete.value = employee;
    modal("delete-employee-modal").show();
  };

  const handleDelete = async (onSuccess?: () => void) => {
    if (!selectedEmployeeToDelete.value) return;

    isDeleting.value = true;

    try {
      await deleteEmployee(selectedEmployeeToDelete.value.uuid);
      modal("delete-employee-modal").hide();
      selectedEmployeeToDelete.value = undefined;
      onSuccess?.();
    } finally {
      isDeleting.value = false;
    }
  };

  const getValue = (itemKey: string, employee: Employee): string => {
    if (itemKey === "login") {
      return `${employee.username}:  ••••••`;
    }
    const value = employee[itemKey as keyof Employee];
    return typeof value === "string" && value ? value : "—";
  };

  onMounted(() => {
    fetchEmployees();
  });

  return {
    employees,
    isLoading,
    isInitialLoading,
    fetchEmployees,
    loadMore,
    getValue,
    selectedEmployeeToDelete,
    isDeleting,
    handleConfirmDelete,
    handleDelete,
  };
};
