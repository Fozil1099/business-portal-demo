<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  total: number
  pageSize?: number
  prevButton?: string
  nextButton?: string
  pageChange?: (page: number) => void
  canChangePerPage?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 50,
  canChangePerPage: false,
})

const emit = defineEmits<{
  (e: 'pageChange', options: number): void
}>()

const perPageOptions = [10, 20, 30, 40, 50]

const visiblePages = computed(() => {
  const start = Math.max(1, props.currentPage - 1) // Начальная страница
  const end = Math.ceil(props.total / props.pageSize!) // Конечная страница
  const page = Array.from({ length: end - start + 1 }, (_, i) => start + i) // Создает массив страниц от start до end
  const result = page.length <= 5 ? page : [...page.splice(0, 4), 0, end] // Если страниц меньше 5, то возвращает их, иначе возвращает первые 4 страницы и последнюю страницу
  

  return result // Возвращает массив страниц
})

const changePage = ({ page }: { page: number }) => {
  const lastPage = visiblePages.value[visiblePages.value.length - 1] ?? 1
  if (page < 1 || page > lastPage)
    return

  emit('pageChange', page)
}

const changePerPage = (e: Event) => {
  if (Number((e.target as HTMLSelectElement).value) === props.pageSize) return

  changePage({ page: props.currentPage })
}
</script>

<template>
  <div class="gap-3 inline-flex items-center">
    <select
      v-if="canChangePerPage"
      class="h-8 px-3 ms-0 leading-none text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      @click="changePerPage"
    >
      <option
        v-for="perPageOption in perPageOptions"
        :key="perPageOption"
        :value="perPageOption"
      >
        {{ perPageOption }}
      </option>
    </select>
    <nav>
      <ul class="inline-flex space-x-2 text-sm">
        <li>
          <button
            class="btn"
            @click="
              visiblePages[currentPage - 1] &&
              changePage({ page: currentPage - 1 })
            "
          >
            <Icon name="arrow-left-1" type="linear" />
          </button>
        </li>
        <li
          v-for="page in visiblePages"
          :key="`page-${page}`"
          @click="page != 0 && page != currentPage && changePage({ page })"
        >
          <p
            :class="{
              '!text-info border border-info rounded-lg': currentPage === page,
              lg: page.toString().length > 2,
              xl: page.toString().length > 4,
            }"
            class="btn cursor-pointer"
          >
            {{ page == 0 ? '...' : page }}
          </p>
        </li>

        <li>
          <button
            class="btn"
            @click="
              visiblePages[currentPage + 1] &&
              changePage({ page: currentPage + 1 })
            "
          >
            <Icon name="arrow-right-1" type="linear" />
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  @apply flex items-center justify-center p-1 w-7 h-7 text-white;

  &.lg {
    @apply w-10;
  }

  &.xl {
    @apply w-12;
  }
}
</style>
