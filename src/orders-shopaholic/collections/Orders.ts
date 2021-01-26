import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Order from "../models/Order";

export default class Orders extends Collection<Order> {
  model() {
    return Order;
  }

  routes() {
    return {
      fetch: "orders.index"
    };
  }
}
