import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";

export default class Offer extends Model {
  id!: number | string;
  name!: string;
  code!: string;
  price!: string;
  price_value!: number;
  old_price!: string;
  old_price_value!: number;
  quantity!: number;
  currency!: string;
  preview_text!: string;
  thumbnail!: string;
  text!: string;
  value!: number;
  active!: number;
  description!: string;
  preview_image!: string;
  images!: OCFileData[];
  property!: any[];

  // TicketShopaholic plugin
  start_publish_at!: string;
  end_publish_at!: string;

  defaults() {
    return {
      id: null,
      active: false,
      name: null,
      code: null,
      price: null,
      price_value: null,
      old_price: null,
      old_price_value: null,
      quantity: null,
      currency: null,
      preview_text: null,
      thumbnail: null,
      description: null,
      preview_image: null,
      images: [],
      property: []
    };
  }

  routes() {
    return {
      fetch: "offers.show",
      create: "offers.store",
      update: "offers.update",
      delete: "offers.destroy"
    };
  }
}
