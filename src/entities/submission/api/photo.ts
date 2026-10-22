import { http } from "@/app/providers/axios/http";

// Фото заявки отдаются защищённым маршрутом, поэтому грузим их с токеном
export const getPhotoBlob = (url: string) => http.getFile(url);
