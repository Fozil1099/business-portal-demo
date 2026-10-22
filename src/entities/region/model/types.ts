export interface Region {
  uuid: string;
  title: string;
  title_ru: string | null;
  title_uz: string | null;
  is_active: boolean;
}

export interface District {
  uuid: string;
  region: string;
  region_title: string;
  title: string;
  title_ru: string | null;
  title_uz: string | null;
  is_active: boolean;
}
