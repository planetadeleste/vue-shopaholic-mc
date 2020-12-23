import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string } from "vue-mc/validation";
import _ from "lodash";

export default class Country extends Model {
  id!: number;
  name!: string;
  code!: string;
  is_pinned!: boolean;
  is_enabled!: boolean;
  is_default!: boolean;

  defaults() {
    return {
      id: null,
      name: null
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [_.toString, _.trim],
      code: [_.toString, _.trim]
    };
  }

  validation() {
    return {
      name: required.and(string),
      code: required.and(string)
    };
  }

  options() {
    return {
      methods: {
        states: "GET"
      }
    };
  }

  routes() {
    return {
      fetch: "countries.show",
      create: "countries.store",
      update: "countries.update",
      delete: "countries.destroy",
      states: "countries.states"
    };
  }

  /**
   * Load states of this country
   *
   * @route api/v1/countries/{id}/states
   * @returns {Promise<Response>}
   */
  getStates() {
    const method = this.getOption("methods.states");
    const route = this.getRoute("states");
    const params = _.pick(this.getRouteParameters(), "id");
    const url = this.getURL(route, params);
    const data = this.getSaveData();

    return this.createRequest({ method, url, data }).send();
  }
}
