import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import PaymentMethod from "../models/PaymentMethod";

export default class PaymentMethods extends Collection<PaymentMethod> {
  model() {
    return PaymentMethod;
  }

  routes() {
    return {
      fetch: "paymentmethods.index"
    };
  }
}
