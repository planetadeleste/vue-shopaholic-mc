import { Collection as BaseCollection } from "vue-mc";
import Response from "vue-mc";
import _ from "lodash";
import { applyMixinsAsSubclass } from "@qiwi/mixin";
import Base from "./Base";

export default class Collection extends applyMixinsAsSubclass(
  BaseCollection,
  Base
) {
  boot() {
    this.on("fetch", (obEvent: Record<string, any>) => {
      const sError = _.get(obEvent, "error");
      if (sError) {
        this.alert(sError);
      }
    });
  }

  getModelsFromResponse(response: Response): any {
    const models: unknown = response.getData();

    // An empty, non-array response indicates that we didn't intend to send
    // any models in the response. This means that the current models are
    // already up to date, as no changes are necessary.
    if (_.isNil(models) || models === "") {
      return null;
    }

    // We're making an assumption here that paginated models are returned
    // within the "data" field of the response.
    if (this.isPaginated() || _.has(models, "data")) {
      return _.get(models, "data", models);
    }

    return models;
  }

  /**
   *
   * @param {Object} filters JSON object to add filters param
   * @returns {Collection}
   */
  filterBy<T extends Collection>(this: T, filters: object): T {
    if (_.isEmpty(filters) || !_.isPlainObject(filters)) {
      return this;
    }

    if (_.has(filters, "filters")) {
      filters = _.get(filters, "filters");
    }

    const obFilters = this.get("filters", {});
    _.assign(obFilters, filters);

    this.set("filters", obFilters);

    return this;
  }
}
