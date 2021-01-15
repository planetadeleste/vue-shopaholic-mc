import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string, number } from "vue-mc/validation";
import { pick, toNumber } from "lodash";
import Country from "./Country";

export default class State extends Model {
  id!: number;
  country_id!: number;
  name!: string;
  code!: string;
  is_default!: boolean;
  country!: Country;

  defaults() {
    return {
      id: null,
      name: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr],
      country: (obData: object) => {
        return new Country(obData);
      }
    };
  }

  validation() {
    return {
      country_id: required.and(number),
      name: required.and(string),
      code: required.and(string)
    };
  }

  options() {
    return {
      methods: {
        towns: "GET"
      }
    };
  }

  routes() {
    return {
      fetch: "states.show",
      create: "states.store",
      update: "states.update",
      delete: "states.destroy",
      towns: "states.towns"
    };
  }

  /**
   * Load towns of this state
   *
   * @route api/v1/states/{id}/towns
   * @returns {Promise<Response>}
   */
  getTowns() {
    const method = this.getOption("methods.towns");
    const route = this.getRoute("towns");
    const params = pick(this.getRouteParameters(), "id");
    const url = this.getURL(route, params);
    const data = this.getSaveData();

    return this.createRequest({ method, url, data }).send();
  }
}
