import { Collection as BaseCollection, Model, Response } from "vue-mc";
import { AxiosRequestConfig } from "axios";
import Request from "./Request";
import _ from "lodash";
import Base from "./Base";

export default class Collection<A extends Model = Model> extends BaseCollection<
  A
> {
  private _baseClass!: Base;
  private _base() {
    if (!this._baseClass) {
      this._baseClass = new Base();
    }

    return this._baseClass;
  }

  boot() {
    this._base();

    this.on("fetch", (obEvent: Record<string, any>) => {
      const sError = _.get(obEvent, "error");
      if (sError) {
        this.alert(sError);
      }
    });
  }

  getRouteResolver() {
    return Base.$resolve;
  }

  /**
   * Send an alert message to Flash store service
   *
   * @param {string} sMessage Alert Message
   * @param {string} sType Alert type (error, info, success)
   */
  alert(sMessage: string, sType = "error"): string {
    if (!Base.$flashModule) {
      return sMessage;
    }

    _.invoke(Base.$flashModule, sType, sMessage);
    return sMessage;
  }

  /**
   * @returns {Request} A new `Request` using the given configuration.
   */
  createRequest(config: AxiosRequestConfig): Request {
    const obRequest = new Request(config);
    obRequest.$http = Base.$http;
    return obRequest;
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
