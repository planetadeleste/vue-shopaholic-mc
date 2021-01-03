import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import { trim, toNumber, toString } from "lodash";
import { required, string } from "vue-mc/validation";

export default class Brand extends Model {
  id!: number;
  active!: boolean;
  name!: string;
  slug!: string;
  code!: string;
  preview_text!: string;
  preview_image!: string;
  images!: OCFileData[];
  created_at!: string;
  updated_at!: string;
  external_id!: string;
  description!: string;
  sort_order!: number;

  defaults() {
    return {
      id: null,
      name: null,
      slug: null,
      active: false,
      code: null,
      preview_text: null,
      preview_image: null,
      images: [],
      created_at: null,
      updated_at: null,
      external_id: null,
      description: null,
      sort_order: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [toString, trim],
      slug: [toString, trim],
      description: [toString, trim],
      preview_text: [toString, trim],
      preview_image: [toString, trim],
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
      fetch: "brands.show",
      create: "brands.store",
      update: "brands.update",
      delete: "brands.destroy"
    };
  }
}
