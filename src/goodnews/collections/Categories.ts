import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Category from "../models/Category";

export default class Categories extends Collection<Category> {
  model() {
    return Category;
  }

  routes() {
    return {
      fetch: "blog.categories.index"
    };
  }
}
