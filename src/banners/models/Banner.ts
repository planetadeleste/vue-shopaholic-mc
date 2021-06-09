import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { BannerData } from "../types/Banner";

class Banner extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      size_id: null,
      product_id: null,
      created_at: null,
      updated_at: null,
      title: null,
      name: null,
      subtitle: null,
      pretitle: null,
      page: null,
      url: null,
      offer: null,
      button_label: null,
      bottom_caption: null,
      icon: null,
      link_type: null,
      text_pos: null,
      image: null,
      background: null,
      active: null
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
