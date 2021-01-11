import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import { required, string } from "vue-mc/validation";
import { toNumber } from "lodash";
import Categories from "../collections/Categories";

export default class Category extends Model {
  id!: number;
  parent_id!: number;
  active!: boolean;
  name!: string;
  code!: string;
  slug!: string;
  preview_image!: string;
  images!: OCFileData[];
  preview_text!: string;
  created_at!: string;
  updated_at!: string;
  description!: string;
  external_id!: string;
  children!: Categories;

  defaults() {
    return {
      id: null,
      parent_id: null,
      active: false,
      name: null,
      code: null,
      slug: null,
      preview_image: null,
      images: [],
      preview_text: null,
      created_at: null,
      updated_at: null,
      description: null,
      external_id: null
    };
  }

  defineRelations() {
    return {
      children: {
        class: Categories
      }
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      slug: [cleanStr],
      description: [cleanStr],
      preview_text: [cleanStr],
      preview_image: [cleanStr]
    };
  }

  validation() {
    return {
      name: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "categories.show",
      create: "categories.store",
      update: "categories.update",
      delete: "categories.destroy"
    };
  }
}
