import { Categories as BaseCategories } from "@bit/planetadeleste.shopaholic-mc.shopaholic";
import Category from "../models/Category";

export default class Categories extends BaseCategories {
  model() {
    return Category;
  }

  byEvents() {
    return this.filterBy({ isEvent: 1 });
  }

  byProducts() {
    return this.filterBy({ isNotEvent: 1 });
  }
}
