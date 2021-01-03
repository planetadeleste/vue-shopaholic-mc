import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import Category from "./Category";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import Offer from "./Offer";
import _ from "lodash";
import { required, string } from "vue-mc/validation";

export default class Product extends Model {
  id!: number;
  category_id!: number;
  category!: Category;
  slug!: string;
  name!: string;
  category_name!: string;
  offers!: Offer[];
  images!: OCFileData[];
  preview_image!: string;
  preview_text!: string;
  created_at!: string;
  updated_at!: string;
  active!: boolean;
  external_id!: string;
  description!: string;
  secondary_thumb?: string;
  thumbnail?: string;
  code!: string;

  defaults() {
    return {
      id: null,
      category_id: null,
      active: false,
      slug: null,
      name: null,
      category_name: null,
      offers: [],
      images: [],
      preview_image: null,
      preview_text: null,
      created_at: null,
      updated_at: null,
      external_id: null,
      description: null,
      code: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [_.toString, _.trim],
      slug: [_.toString, _.trim],
      description: [_.toString, _.trim],
      preview_text: [_.toString, _.trim],
      preview_image: [_.toString, _.trim],
      images: Array
    };
  }

  validation() {
    return {
      name: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "products.show",
      create: "products.store",
      update: "products.update",
      delete: "products.destroy"
    };
  }
}
