import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { Product } from "@bit/planetadeleste.shopaholic-mc.shopaholic";
import { required, number } from "vue-mc/validation";
import _ from "lodash";

export default class Event extends Model {
  id!: number;
  country_id!: number;
  product_id!: number;
  state_id!: number;
  town_id!: number;
  days_before_close!: number;
  days_before_open!: number;
  event_at!: string;
  product!: Product;

  defaults() {
    return {
      id: null,
      product_id: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      product_id: (id: string) => _.toNumber(id) || null
    };
  }

  validation() {
    return {
      product_id: required.and(number)
    };
  }

  routes() {
    return {
      fetch: "events.show",
      create: "events.store",
      update: "events.update",
      delete: "events.destroy"
    };
  }
}
