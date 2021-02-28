import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { StatusData } from "../types/Status";

class Status extends Model {
  defaults() {
    return {
      id: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null
    };
  }

  validation() {
    return {};
  }

  routes() {
    return {
      fetch: "orders.show",
      create: "orders.store",
      update: "orders.update",
      delete: "orders.destroy"
    };
  }
}

interface Status extends Model, StatusData {}
export default Status;
