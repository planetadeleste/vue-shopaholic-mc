import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";

export default class Offer extends Model {
  defaults() {
    return {
      id: null,
      product_id: null,
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

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr],
      description: [cleanStr],
      preview_text: [cleanStr],
      price: (sPrice?: string | number) => {
        if (!sPrice) {
          return this.price_value;
        }
        return sPrice;
      },
      old_price: (sPrice?: string | number) => {
        if (!sPrice) {
          return this.old_price_value;
        }
        return sPrice;
      }
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
