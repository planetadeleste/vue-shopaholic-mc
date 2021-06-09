import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { SizeData } from "../types/Size";

class Size extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      width: null,
      height: null,
      percent_ratio: null,
      name: null,
      image: null,
      size: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
    };
  }

  validation(): Record<string, any> {
    return {};
  }

  routes(): Record<string, any> {
    return {
      fetch: "banners.sizes.show",
      create: "banners.sizes.store",
      update: "banners.sizes.update",
      delete: "banners.sizes.destroy",
    };
  }
}

interface Size extends Model, SizeData {}
export default Size;
