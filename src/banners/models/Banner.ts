import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { BannerData } from "../types/Banner";

class Banner extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
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
      fetch: "banners.banners.show",
      create: "banners.banners.store",
      update: "banners.banners.update",
      delete: "banners.banners.destroy",
    };
  }
}

interface Banner extends Model, BannerData {}
export default Banner;
