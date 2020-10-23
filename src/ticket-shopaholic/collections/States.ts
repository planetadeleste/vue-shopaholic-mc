import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import State from "../models/State";

export default class States extends Collection<State> {
  model() {
    return State;
  }

  routes() {
    return {
      fetch: "states.index"
    };
  }
}
