import { Collection as BaseCollection, Model, Response } from "vue-mc";
import { AxiosRequestConfig } from "axios";
import Request from "./Request";
import _ from "lodash";
import Base from "./Base";
import {
  ApiLinksResponse,
  ApiMetaResponse
} from "@bit/planetadeleste.shopaholic.types.api";

export default class Collection<A extends Model = Model> extends BaseCollection<
  A
> {
  private _baseClass!: Base;
  private _links: ApiLinksResponse | Record<string, any> = {};
  private _meta: ApiMetaResponse | Record<string, any> = {};

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

    // Add pagination meta/links properties
    if (_.has(models, "meta")) {
      this._meta = _.get(models, "meta");
      this.page(this._meta.current_page);
    }

    if (_.has(models, "links")) {
      this._links = _.get(models, "links");
    }

    // We're making an assumption here that paginated models are returned
    // within the "data" field of the response.
    if (this.isPaginated() || _.has(models, "data")) {
      return _.get(models, "data", models);
    }

    return models;
  }

  /*
   * PAGINATION METHODS
   */

  /**
   * Get the current collection page, gived from server response
   * @returns {number}
   */
  getCurrentPage<T extends Collection>(this: T): number {
    return _.get(this._meta, "current_page", 1);
  }

  /**
   * Get last collection page, gived from server response
   * @returns {number}
   */
  getLastPage<T extends Collection>(this: T): number {
    return _.get(this._meta, "last_page", 1);
  }

  /**
   * Get total number of collection items from server
   * @returns {number}
   */
  getTotalItems<T extends Collection>(this: T): number {
    return _.get(this._meta, "total", 0);
  }

  /**
   * Get pagination data
   * @returns {ApiMetaResponse}
   */
  getPaginationData<T extends Collection>(
    this: T
  ): ApiMetaResponse | Record<string, any> {
    return this._meta;
  }

  /**
   * Get pagination links for first, last, next and prev page
   * @returns {ApiLinksResponse}
   */
  getLinks<T extends Collection>(
    this: T
  ): ApiLinksResponse | Record<string, any> {
    return this._links;
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

  /**
   * Limit number of records getting from query
   *
   * @param {Number} iCount Number of records to get
   */
  limit<T extends Collection>(this: T, iCount: number): T {
    this.set("limit", iCount);

    return this;
  }

  /**
   * @returns {Record<string, any>} A native representation of this collection models that will determine the contents of JSON.stringify(model).
   */
  getModelList<T extends Collection>(this: T): Record<string, any> {
    return _.map(this.getModels(), obModel => obModel.toJSON());
  }
}
