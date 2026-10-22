import { http } from "@/app/providers/axios/http";
import type { District, Region } from "../model/types";

// Справочники не пагинируются: приходит весь список
export const getRegions = () => {
  return http.get<Region[]>("/regions/");
};

export const getDistricts = (regionUuid: string) => {
  return http.get<District[]>(`/regions/${regionUuid}/districts/`);
};
