import { Model } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";

export default class Offer extends Model {
  id: number;
  product_id: number;
  name: string;
  code: string;
  price: string;
  price_value: number;
  old_price: string;
  old_price_value: number;
  quantity: number;
  currency: string;
  preview_text: string;
  thumbnail: string;
  text: string;
  value: number;
  active: number;
  description: string;
  preview_image: string;
  images: OCFileData[];
  property: any[];

  // TicketShopaholic plugin
  start_publish_at: string;
  end_publish_at: string;
}