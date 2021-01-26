import { Model } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";

export default class Order extends Model {
  id: number;
  currency_id: number;
  status_id: number;
  transaction_id: number;
  user_id: number;
  order_position_id: number;
  order_promo_mechanism_id: number;
  payment_method_id: number;
  shipping_type_id: number;

  created_at: string;
  updated_at: string;
  order_number: string;

  discount_position_total_price: number;
  discount_position_total_price_value: number;
  discount_shipping_price: number;
  discount_shipping_price_value: number;
  discount_total_price: number;
  discount_total_price_value: number;
  old_position_total_price: number;
  old_position_total_price_value: number;
  old_shipping_price: number;
  old_shipping_price_value: number;
  old_total_price: number;
  old_total_price_value: number;
  payment_data: Record<string, any>;
  payment_method: number;
  payment_response: number;
  payment_token: string;
  position_total_price: number;
  position_total_price_value: number;
  property: Record<string, any>;
  secret_key: string;
  shipping_price: number;
  shipping_price_value: number;
  shipping_tax_percent: number;
  status: number;
  total_price_value: number;
  weight: number;
}
