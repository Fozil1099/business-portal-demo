<script lang="ts" setup>
import { ref } from "vue";
import {
  CompanyDetail,
  Transport,
  Certificate,
} from "@/widgets/cabinet/company";
import {
  useCompany,
  useTransportDelete,
  CompanyInfoModal,
  TransportModal,
  TransportDeleteModal,
  type CompanyCar,
} from "@/features/cabinet/company";
import { modal } from "@/shared/ui";

const { company, fetchCompany } = useCompany();

const selectedCar = ref<CompanyCar | undefined>();
const { handleConfirmDelete, handleDelete } = useTransportDelete();

const handleAddTransport = () => {
  selectedCar.value = undefined;
  modal("transport-modal").show();
};

const handleEditTransport = (car: CompanyCar) => {
  selectedCar.value = car;
  modal("transport-modal").show();
};
</script>

<template>
  <div class="space-y-3">
    <CompanyDetail :company="company" />
    <!-- Машин и сертификатов нет в CompanyDetail: транспорт -->
    <Transport
      @update="fetchCompany"
      @add="handleAddTransport"
      @edit="handleEditTransport"
      @delete="handleConfirmDelete"
    />
    <Certificate />
    <CompanyInfoModal :company="company" @update="fetchCompany" />
    <TransportModal :car="selectedCar" @update="fetchCompany" />
    <TransportDeleteModal @delete="handleDelete(fetchCompany)" />
  </div>
</template>
