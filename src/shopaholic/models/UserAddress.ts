import { Model } from "@bit/planetadeleste.shopaholic-mc.base";

export default class UserAddress extends Model {
  id!: number;
  user_id!: number;
  type!: string;
  country!: string;
  state!: string;
  city!: string;
  street!: string;
  house!: string;
  building!: string;
  flat!: string;
  floor!: string;
  address1!: string;
  address2!: string;
  postcode!: string;
  created_at!: string;
  updated_at!: string;

  defaults() {
    return {
      id: null,
      user_id: null,
      type: null,
      country: null,
      state: null,
      city: null,
      street: null,
      house: null,
      building: null,
      flat: null,
      floor: null,
      address1: null,
      address2: null,
      postcode: null,
      created_at: null,
      updated_at: null
    };
  }
}
