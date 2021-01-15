import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string } from "vue-mc/validation";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import { toNumber } from "lodash";

export default class Category extends Model {
  id!: number;
  name!: string;
  code!: string;
  slug!: string;
  preview_image!: string;
  images!: OCFileData[];
  preview_text!: string;
  description!: string;
  created_at!: string;
  updated_at!: string;
  active!: boolean;
  external_id!: string | number;
  children!: Category[];

  defaults() {
    return {
      id: null,
      name: null,
      code: null,
      slug: null,
      preview_image: null,
      images: [],
      preview_text: null,
      description: null,
      active: false,
      external_id: null,
      children: []
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
      fetch: "blog.categories.show",
      save: "blog.categories.store",
      create: "blog.categories.store",
      update: "blog.categories.update",
      delete: "blog.categories.destroy"
    };
  }
}
