import { OfferData } from "@bit/planetadeleste.shopaholic-mc.shopaholic/types/Offer";
import { ProductData } from "@bit/planetadeleste.shopaholic-mc.shopaholic/types/Product";

export interface TotalPriceContainerData {
  price: string;
  price_value: number;
  tax_price: string;
  tax_price_value: number;
  price_without_tax: string;
  price_without_tax_value: number;
  price_with_tax: string;
  price_with_tax_value: number;

  old_price: string;
  old_price_value: number;
  tax_old_price: string;
  tax_old_price_value: number;
  old_price_without_tax: string;
  old_price_without_tax_value: number;
  old_price_with_tax: string;
  old_price_with_tax_value: number;

  discount_price: string;
  discount_price_value: number;
  tax_discount_price: string;
  tax_discount_price_value: number;
  discount_price_without_tax: string;
  discount_price_without_tax_value: number;
  discount_price_with_tax: string;
  discount_price_with_tax_value: number;

  increase_price: string;
  increase_price_value: number;
  tax_increase_price: string;
  tax_increase_price_value: number;
  increase_price_without_tax: string;
  increase_price_without_tax_value: number;
  increase_price_with_tax: string;
  increase_price_with_tax_value: number;
}

export interface ItemPriceData extends TotalPriceContainerData {
  price_per_unit: string;
  price_per_unit_value: number;
  tax_price_per_unit: string;
  tax_price_per_unit_value: number;
  price_per_unit_without_tax: string;
  price_per_unit_without_tax_value: number;
  price_per_unit_with_tax: string;
  price_per_unit_with_tax_value: number;

  old_price_per_unit: string;
  old_price_per_unit_value: number;
  tax_old_price_per_unit: string;
  tax_old_price_per_unit_value: number;
  old_price_per_unit_without_tax: string;
  old_price_per_unit_without_tax_value: number;
  old_price_per_unit_with_tax: string;
  old_price_per_unit_with_tax_value: number;

  discount_price_per_unit: string;
  discount_price_per_unit_value: number;
  tax_discount_price_per_unit: string;
  tax_discount_price_per_unit_value: number;
  discount_price_per_unit_without_tax: string;
  discount_price_per_unit_without_tax_value: number;
  discount_price_per_unit_with_tax: string;
  discount_price_per_unit_with_tax_value: number;

  increase_price_per_unit: string;
  increase_price_per_unit_value: number;
  tax_increase_price_per_unit: string;
  tax_increase_price_per_unit_value: number;
  increase_price_per_unit_without_tax: string;
  increase_price_per_unit_without_tax_value: number;
  increase_price_per_unit_with_tax: string;
  increase_price_per_unit_with_tax_value: number;
}

export interface CartPositionData {
  id: number;
  item_id: number;
  item_type: string;
  quantity: number;
  max_quantity: number;
  weight: number;
  property: Record<string, any>;
}

export interface CartData {
  position: CartPositionData[];
  shipping_price: ItemPriceData;
  position_total_price: TotalPriceContainerData;
  total_price: TotalPriceContainerData;
  quantity: number;
  total_quantity: number;
  weight: number;
  payment_method_id: number;
  shipping_type_id: number;
  user_data: number;
  shipping_address: number;
  billing_address: number;
  property: Record<string, any>;
}

export interface CartComponentPositionData {
  offer: OfferData;
  product: ProductData;
  price: string;
  currency: string;
  total: string;
  total_value: number;
  quantity: number;
  price_per_unit: string;
  price_per_unit_value: number;
}

export interface CartComponentAddItemData {
  id?: number;
  offer_id: number;
  quantity: number;
  property?: Record<string, any>;
}

export interface CartComponentAddData {
  cart: CartComponentAddItemData[];
  shipping_type_id?: number;
  payment_method_id?: number;
}

export interface CartComponentRemoveData extends CartComponentAddData {
  cart: number[];
}

export interface CartComponentItemsData {
  positions: CartComponentPositionData[];
  currency: string;
  total: string;
  total_value: number;
}
