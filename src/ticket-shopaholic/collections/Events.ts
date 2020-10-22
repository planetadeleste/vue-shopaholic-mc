import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Event from "../models/Event";

export default class Events extends Collection {
  model() {
    return Event;
  }

  routes() {
    return {
      fetch: "events.index"
    };
  }
}
