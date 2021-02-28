import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Status from "../models/Status";

export default class Statuses extends Collection<Status> {
  model() {
    return Status;
  }

  routes() {
    return {
      fetch: "orders.index"
    };
  }
}
