/**
 * Конвертирует объект в FormData для отправки файлов и данных на сервер
 * @param data - Объект с данными для конвертации
 * @param form - Существующий экземпляр FormData (опционально)
 * @param namespace - Пространство имен для вложенных объектов (опционально)
 * @returns FormData с добавленными данными
 */
export const changeToFormData = (
  data: Record<string, any>,
  form?: FormData,
  namespace?: string,
): FormData => {
  const fd = form || new FormData();

  for (const property in data) {
    if (!data.hasOwnProperty(property)) continue;

    const value = data[property];
    const formKey = namespace ? `${namespace}.${property}` : property;

    // Пропускаем undefined значения
    if (value === undefined) continue;

    // Обработка массивов
    if (Array.isArray(value)) {
      value.forEach((item) => {
        fd.append(property, item);
      });
      continue;
    }

    // Обработка объектов (кроме File и Blob)
    if (
      typeof value === "object" &&
      value !== null &&
      !(value instanceof File) &&
      !(value instanceof Blob)
    ) {
      changeToFormData(value, fd, property);
      continue;
    }

    // Обработка примитивов, File и Blob
    fd.append(formKey, value);
  }

  return fd;
};

const pad = (value: number) => String(value).padStart(2, "0");

// "2026-10-05T13:03:49+05:00" -> "05.10.2026 - 13:03" (в локальном времени)
export const formatDateTime = (value: string | null | undefined): string => {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}.${month}.${date.getFullYear()} - ${hours}:${minutes}`;
};

// 2735 -> "2,735"; compact: 18600 -> "18K+", 1500000 -> "1.5M+"
export const formatStatNumber = (value: number, compact = false): string => {
  if (compact && value >= 1_000_000) {
    return `${Number((value / 1_000_000).toFixed(1))}M+`;
  }
  if (compact && value >= 1_000) {
    return `${Math.floor(value / 1_000)}K+`;
  }
  return value.toLocaleString("en-US");
};

export const formatPhoneNumber = (number: string): string => {
  const cleaned = number.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
  }
  return number;
};
