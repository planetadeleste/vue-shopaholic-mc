import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Banner from "../models/Banner";

export default class Banners extends Collection<Banner> {
  model(): typeof Banner {
    return Banner;
  }

  routes(): Record<string, any> {
    return {
      fetch: "banners.banners.index",
    };
  }
}
