<script lang="ts" setup>
import { reactive } from 'vue'

interface Emit {
  (e: 'rowClicked', rowItem: any, index: number): void
  (
    e: 'onSort',
    value: {
      [key: string]: string
    },
  ): void
}

interface Props {
  headers: {
    text: string
    value: string
    tdClass?: string | unknown
    thClass?: string | unknown
    sort?: boolean
  }[]
  columns: {
    [key: string]: any
  }[]
  bordered?: boolean
  adaptive?: boolean
  hover?: boolean
  loading?: boolean
  rowClass?: string | unknown
}

defineProps<Props>()

const emit = defineEmits<Emit>()

const slot = defineSlots()
const sortValues = reactive(new Map())

const onClickSort = (column: { sortValue?: string; value: string }) => {
  if (!sortValues.get(column.value)) {
    sortValues.set(column.value, column.value)
  }

  if (sortValues.get(column.value) == column.value) {
    sortValues.set(column.value, '-' + column.value)
  } else {
    sortValues.set(column.value, column.value)
  }

  emit('onSort', { [column.value]: sortValues.get(column.value) })
}
</script>

<template>
  <div class="overflow-x-auto custom-scrollbar">
    <table class="w-full text-sm">
      <thead>
        <tr class="border-b border-white/20">
          <th
            v-for="(column, index) in headers"
            :key="index"
            class="text-left py-3 px-4 text-white font-medium"
            :class="column.thClass"
          >
            <template
              v-if="slot['header-' + column.value]"
              :name="'header-' + column.value"
            >
              <slot :name="'header-' + column.value" />
            </template>
            <div
              v-else
              class="flex gap-2 items-center"
              :class="{ 'cursor-pointer': column.sort }"
              @click="onClickSort(column)"
            >
              <span> {{ column.text }}</span>
              <div v-if="column.sort">
                <Icon
                  :name="
                    sortValues.get(column.value) == '-' + column.value
                      ? 'arrow-down'
                      : 'arrow-up-1'
                  "
                  type="bold"
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <template v-if="columns?.length > 0">
        <tbody v-if="!loading">
          <tr
            v-for="(row, rowIndex) in columns"
            :key="rowIndex"
            :class="{
              'border-b border-white/5':
                bordered && rowIndex !== columns.length - 1,
              [rowClass as string]: rowClass,
            }"
            @click="emit('rowClicked', row, rowIndex)"
          >
            <td
              v-for="(column, colIndex) in headers"
              :key="colIndex"
              class="py-3 px-4 text-white text-sm font-normal"
              :class="column.tdClass"
            >
              <template v-if="slot[column.value]" :name="column.value">
                <slot :name="column.value" :data="row" />
              </template>
              <span v-else class="py-1.5">
                {{ row[column.value] || 'N/A' }}
              </span>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="100%" class="text-center py-10">
              <div class="flex items-center justify-center">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"
                ></div>
                <div class="ml-3 text-white/50">Loading data...</div>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
      <template v-else>
        <tbody>
          <tr>
            <td colspan="100%" class="text-center py-10">
              <div class="flex items-center justify-center">
                <div class="ml-3 text-white/50">No data found</div>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </table>
  </div>
</template>
