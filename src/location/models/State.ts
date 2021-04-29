import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string, number } from "vue-mc/validation";
import { pick, toNumber } from "lodash";
import Country from "./Country";
import { StateData } from "../types/State";
import { Response } from "vue-mc";
import { TownData } from "../types/Town";
import { CountryData } from "../types/Country";

class State extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      name: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr],
      country: (obData: CountryData) => {
        return new Country(obData);
      },
    };
  }

  validation(): Record<string, any> {
    return {
      country_id: required.and(number),
      name: required.and(string),
      code: required.and(string),
    };
  }

  options(): Record<string, any> {
    return {
      methods: {
        towns: "GET",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "states.show",
      create: "states.store",
      update: "states.update",
      delete: "states.destroy",
      towns: "states.towns",
    };
  }

  /**
   * Load towns of this state
   *
   * @route api/v1/states/{id}/towns
   * @returns {Promise<Response>}
   */
  getTowns(): Promise<Response<TownData[]>> {
    const method = this.getOption("methods.towns");
    const route = this.getRoute("towns");
    const params = pick(this.getRouteParameters(), "id");
    const url = this.getURL(route, params);
    const data = this.getSaveData();

    return this.createRequest({ method, url, data }).send();
  }
}

interface State extends Model, StateData {}
export default State;
