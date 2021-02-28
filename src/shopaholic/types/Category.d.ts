import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";

export interface CategoryData {
  id: number;
  parent_id: number;
  active: boolean;
  name: string;
  code: string;
  slug: string;
  preview_image: string;
  images: OCFileData[];
  preview_text: string;
  created_at: string;
  updated_at: string;
  description: string;
  external_id: string;
  children: Categories;
}
