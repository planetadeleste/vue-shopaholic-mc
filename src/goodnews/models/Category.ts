import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string } from "vue-mc/validation";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import _ from "lodash";

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
      name: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [_.toString, _.trim],
      slug: [_.toString, _.trim],
      description: [_.toString, _.trim],
      preview_text: [_.toString, _.trim],
      preview_image: [_.toString, _.trim]
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
