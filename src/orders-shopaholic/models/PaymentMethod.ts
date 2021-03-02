import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { PaymentMethodData } from "../types/PaymentMethod";

class PaymentMethod extends Model {
  defaults() {
    return {
      id: null,
      name: null,
      code: null,
      preview_text: null,
      restriction: null
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
      fetch: "paymentmethods.show",
      create: "paymentmethods.store",
      update: "paymentmethods.update",
      delete: "paymentmethods.destroy"
    };
  }
}

interface PaymentMethod extends Model, PaymentMethodData {}
export default PaymentMethod;
