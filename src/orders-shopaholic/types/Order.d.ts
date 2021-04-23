import { OfferData } from "@bit/planetadeleste.shopaholic-mc.shopaholic/types/Offer";
import { UserAddressData } from "@bit/planetadeleste.shopaholic-mc.shopaholic/types/UserAddress";
import { RequestOptions, Response } from "vue-mc";
import { StatusData } from "./Status";

export interface OrderPositionData {
  id: number;
  order_id: number;
  code: string;
  currency_code: string;
  currency_symbol: string;
  height: number;
  length: number;
  weight: number;
  width: number;
  quantity: number;
  offer: OfferData;

  discount_total_price: number;
  discount_total_price_per_unit: number;
  discount_total_price_per_unit_value: number;
  discount_total_price_per_unit_with_tax: number;
  discount_total_price_per_unit_with_tax_value: number;
  discount_total_price_per_unit_without_tax: number;
  discount_total_price_per_unit_without_tax_value: number;
  discount_total_price_value: number;
  discount_total_price_with_tax: number;
  discount_total_price_with_tax_value: number;
  discount_total_price_without_tax: number;
  discount_total_price_without_tax_value: number;

  increase_total_price: number;
  increase_total_price_per_unit: number;
  increase_total_price_per_unit_value: number;
  increase_total_price_per_unit_with_tax: number;
  increase_total_price_per_unit_with_tax_value: number;
  increase_total_price_per_unit_without_tax: number;
  increase_total_price_per_unit_without_tax_value: number;
  increase_total_price_value: number;
  increase_total_price_with_tax: number;
  increase_total_price_with_tax_value: number;
  increase_total_price_without_tax: number;
  increase_total_price_without_tax_value: number;

  old_price: number;
  old_price_value: number;
  old_price_with_tax: number;
  old_price_with_tax_value: number;
  old_price_without_tax: number;
  old_price_without_tax_value: number;
  old_total_price: number;
  old_total_price_per_unit: number;
  old_total_price_per_unit_value: number;
  old_total_price_per_unit_with_tax: number;
  old_total_price_per_unit_with_tax_value: number;
  old_total_price_per_unit_without_tax: number;
  old_total_price_per_unit_without_tax_value: number;
  old_total_price_value: number;
  old_total_price_with_tax: number;
  old_total_price_with_tax_value: number;
  old_total_price_without_tax: number;
  old_total_price_without_tax_value: number;

  price: number;
  price_value: number;
  price_with_tax: number;
  price_with_tax_value: number;
  price_without_tax: number;
  price_without_tax_value: number;

  tax_discount_total_price: number;
  tax_discount_total_price_per_unit: number;
  tax_discount_total_price_per_unit_value: number;
  tax_discount_total_price_value: number;
  tax_increase_total_price: number;
  tax_increase_total_price_per_unit: number;
  tax_increase_total_price_per_unit_value: number;
  tax_increase_total_price_value: number;
  tax_old_price: number;
  tax_old_price_value: number;
  tax_old_total_price: number;
  tax_old_total_price_per_unit: number;
  tax_old_total_price_per_unit_value: number;
  tax_old_total_price_value: number;
  tax_percent: number;
  tax_price: number;
  tax_price_value: number;
  tax_total_price: number;
  tax_total_price_per_unit: number;
  tax_total_price_per_unit_value: number;
  tax_total_price_value: number;

  total_price: number;
  total_price_per_unit: number;
  total_price_per_unit_value: number;
  total_price_per_unit_with_tax: number;
  total_price_per_unit_with_tax_value: number;
  total_price_per_unit_without_tax: number;
  total_price_per_unit_without_tax_value: number;
  total_price_value: number;
  total_price_with_tax: number;
  total_price_with_tax_value: number;
  total_price_without_tax: number;
  total_price_without_tax_value: number;
}

export interface OrderData {
  id: number;
  currency_id: number;
  status_id: number;
  transaction_id: number;
  user_id: number;
  payment_method_id: number;
  shipping_type_id: number;
  order_position_id: number[];
  order_promo_mechanism_id: number[];

  created_at: string;
  updated_at: string;
  order_number: string;
  property: Record<string, any>;
  secret_key: string;
  status: StatusData;
  weight: number;
  order_position?: OrderPositionData[];

  discount_position_total_price?: string;
  discount_position_total_price_value?: number;
  discount_shipping_price?: string;
  discount_shipping_price_value?: number;
  discount_total_price?: string;
  discount_total_price_value?: number;

  old_position_total_price?: string;
  old_position_total_price_value?: number;
  old_shipping_price?: string;
  old_shipping_price_value?: number;
  old_total_price?: string;
  old_total_price_value?: number;

  payment_data: Record<string, any>;
  payment_method?: number;
  payment_response?: number;
  payment_token?: string;

  position_total_price: string;
  position_total_price_value: number;

  total_price: string;
  total_price_value: number;

  shipping_price?: string;
  shipping_price_value?: number;
  shipping_tax_percent?: number;

  store(
    options: RequestOptions = {}
  ): Promise<Response<MakeOrderResponseData | any> | null>;
}

export interface OrderRequestOrderData {
  payment_method_id?: number;
  shipping_type_id?: number;
  shipping_price?: number;
  property?: Record<string, any>;
}

export interface OrderRequestUserData {
  [key: string]: any;
  email: string;
  name: string;
}

export interface OrderRequestData {
  order: OrderRequestOrderData;
  user: OrderRequestUserData;
  shipping_address: UserAddressData;
  billing_address: UserAddressData;
}

export interface MakeOrderResponseData {
  id: number;
  number: string;
  key: string;
}
