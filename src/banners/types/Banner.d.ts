import { ProductData } from "@bit/planetadeleste.shopaholic-mc.shopaholic/types/Product";
import { SizeData } from "./Size";

export interface BannerData {
  id: number;
  size_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  size: SizeData;
  product: ProductData;
  title: string;
  subtitle: string;
  pretitle: string;
  page: string;
  url: string;
  offer: string;
  button_label: string;
  bottom_caption: string;
  escape_title: string;
  strip_title: string;
  escape_subtitle: string;
  strip_subtitle: string;
  icon: string;
  link_type: string;
  text_pos: string;
  image: string;
  background: string;
}
