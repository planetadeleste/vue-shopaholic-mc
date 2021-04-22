import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { OrderData } from "../types/Order";

class Order extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      currency_id: null,
      status_id: null,
      transaction_id: null,
      user_id: null,
      discount_position_total_price: null,
      discount_position_total_price_value: null,
      discount_shipping_price: null,
      discount_shipping_price_value: null,
      discount_total_price: null,
      discount_total_price_value: null,
      old_position_total_price: null,
      old_position_total_price_value: null,
      old_shipping_price: null,
      old_shipping_price_value: null,
      old_total_price: null,
      old_total_price_value: null,
      order_number: null,
      order_position_id: null,
      order_promo_mechanism_id: null,
      payment_data: null,
      payment_method: null,
      payment_method_id: null,
      payment_response: null,
      payment_token: null,
      position_total_price: null,
      position_total_price_value: null,
      property: null,
      secret_key: null,
      shipping_price: null,
      shipping_price_value: null,
      shipping_tax_percent: null,
      shipping_type_id: null,
      status: null,
      total_price_value: null,
      weight: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
    };
  }

  validation(): Record<string, any> {
    return {};
  }

  routes(): Record<string, any> {
    return {
      fetch: "orders.show",
      create: "orders.create",
      update: "orders.update",
      delete: "orders.destroy",
    };
  }
}

interface Order extends Model, OrderData {}

export default Order;
