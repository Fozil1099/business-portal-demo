import { ref } from "vue";
import { useServiceCards, type ServiceCardItem } from "@/features/services";
import { modal } from "@/shared/ui";

export const useServicesWidget = () => {
  const { services, items, isLoading, isInitialLoading, loadMore } =
    useServiceCards();

  const selectedService = ref<ServiceCardItem | null>(null);

  const openDetail = (service: ServiceCardItem) => {
    selectedService.value = service;
    modal("card-detail-modal").show();
  };

  return {
    services,
    items,
    selectedService,
    isLoading,
    isInitialLoading,
    loadMore,
    openDetail,
  };
};
