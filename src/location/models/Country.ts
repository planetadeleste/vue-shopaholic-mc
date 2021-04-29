import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string } from "vue-mc/validation";
import { Response } from "vue-mc";
import { toNumber, pick } from "lodash";
import { CountryData } from "../types/Country";
import { StateData } from "../types/State";

class Country extends Model {
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
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
      code: required.and(string),
    };
  }

  options(): Record<string, any> {
    return {
      methods: {
        states: "GET",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "countries.show",
      create: "countries.store",
      update: "countries.update",
      delete: "countries.destroy",
      states: "countries.states",
    };
  }

  /**
   * Load states of this country
   *
   * @route api/v1/countries/{id}/states
   * @returns {Promise<Response>}
   */
  getStates(): Promise<Response<StateData[]>> {
    const method = this.getOption("methods.states");
    const route = this.getRoute("states");
    const params = pick(this.getRouteParameters(), "id");
    const url = this.getURL(route, params);
    const data = this.getSaveData();

    return this.createRequest({ method, url, data }).send();
  }
}

interface Country extends Model, CountryData {}
export default Country;
