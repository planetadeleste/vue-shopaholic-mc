import Vue from "vue";
import Base from "./Base";
import { Model as BaseModel, RequestOptions, Response } from "vue-mc";
import { AxiosRequestConfig } from "axios";
import Request from "./Request";
import { serialize } from "object-to-formdata";
import _ from "lodash";

type Constructor<T> = new (...args: any[]) => T;

export interface RelationConfig {
  class: Constructor<Model>;
  foreignKey?: string;
  localKey?: string;
  aliases?: string[];
}

export default class Model extends BaseModel {
  _accessors!: Record<string, Accessor>;
  _relations!: Record<string, Constructor<Model>>;
  _baseClass!: Base;
  _base() {
    if (!this._baseClass) {
      this._baseClass = new Base();
    }

    return this._baseClass;
  }

  boot() {
    this._base();
    Vue.set(this, "_relations", {});
    Vue.set(this, "_accessors", {});

    this.compileAccessors();
    this.assignRelations();
  }

  get relations() {
    return this._relations;
  }

  definedRelations(): Record<string, RelationConfig> {
    return {};
  }

  setRelation(
    name: string,
    config: RelationConfig,
    relation: Record<string, any>
  ) {
    if (relation && _.isPlainObject(relation)) {
      relation = new config.class(relation);
    }

    const foreignKey = config.foreignKey || `${name}_id`;
    const localKey = config.localKey || "id";

    Vue.set(this._relations, name, relation);
    const value = relation ? relation[localKey] : null;
    this.set(foreignKey, value);

    return this;
  }

  getRelation(name: string) {
    return this._relations[name];
  }

  registerRelation(name: string, config: RelationConfig) {
    const names = _.unionBy([name], config.aliases);

    _.each(names, (item: string) => {
      const exist = !_.isUndefined(this[item]); // I can't find how to set Relations before super() method.

      Object.defineProperty(this, item, {
        get: () => this.getRelation(name),
        set: relation => this.setRelation(name, config, relation)
      });

      if (exist) {
        this[item] = _.cloneDeep(this.get(item));
        this.unset(item);
      }
    });

    return this;
  }

  assignRelations() {
    _.each(this.definedRelations(), (config, name) => {
      this.registerRelation(name, config);
    });
  }

  /**
   * The isDirty method determines if any of the model's attributes have
   * been changed since the model was retrieved. You may pass a specific
   * attribute name to the isDirty method to determine if a particular
   * attribute is dirty.
   *
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {boolean}
   * @memberof Model
   */
  isDirty(sKey?: string) {
    const arChanged = this.changed();
    if (!arChanged) {
      return false;
    }

    return sKey ? arChanged.includes(sKey) : true;
  }

  /**
   *  @returns {Object} Attribute accessor keyed by attribute name.
   */
  accessors(): Record<string, Accessor | Accessor[]> {
    return {};
  }

  /**
   * Compiles all accessors into pipelines that can be executed quickly.
   */
  compileAccessors(): void {
    this._accessors = _.mapValues(
      this.accessors(),
      (m: Accessor | Accessor[]): Accessor => _.flow(m as Accessor[])
    );

    this.on("sync", this.assignAccessors.bind(this));
  }

  /**
   * Sync all accessors with model attributes
   */
  assignAccessors(): void {
    _.each(this._accessors, (fAccessor: Accessor, sKey) => {
      this.set(sKey, fAccessor());
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

  /**
   * Create a custom request, using option.method, route and data
   *
   * @param {string} sMethod Method key name
   * @param {string | Record<string, any> | boolean} [sRoute] Route key name
   * @param {Record<string, any> | boolean} [obData]
   * @param {boolean} [bWithoutParams] Set true to prevent extra params on routes with GET, HEAD request type
   * @returns {Promise<Response>}
   */
  async createCustomRequest(
    sMethod: string,
    sRoute?: string | Record<string, any> | boolean,
    obData?: Record<string, any> | boolean,
    bWithoutParams?: boolean
  ): Promise<Response> {
    if (!_.isString(sRoute)) {
      if (_.isBoolean(sRoute)) {
        bWithoutParams = sRoute;
        obData = {};
      } else if (_.isPlainObject(sRoute)) {
        obData = sRoute;
      }

      if (_.isUndefined(bWithoutParams)) {
        bWithoutParams = false;
      }

      sRoute = sMethod;
    }

    const method = this.getOption(`methods.${sMethod}`);
    const route = this.getRoute(sRoute);
    const params = bWithoutParams ? {} : this.getRouteParameters();
    const url = this.getURL(route, params);

    return await this.createRequest({ method, url, data: obData }).send();
  }

  /**
   * @returns {Object} The data to send to the server when saving this model.
   */
  getSaveData(): Record<string, any> {
    if (!this.isNew()) {
      this.set("_method", "PUT");
    }

    return super.getSaveData();
  }

  /**
   * Iterates over elements of data to find instanceof File
   *
   * @param {Object} data
   * @returns {Boolean}
   */
  private hasFileUpload(data: any): boolean {
    let hasFile = false;

    if (data instanceof File) {
      return true;
    }

    if (_.isArray(data) || _.isObject(data)) {
      _.forEach(data, (item: any) => {
        if (this.hasFileUpload(item)) {
          hasFile = true;
        }
      });
    } else if (data instanceof File) {
      hasFile = true;
    }

    return hasFile;
  }

  /**
   * Detect instance of File in saved data ams call upload or save methods.
   * Persists data to the database/API.
   *
   * @param {options}             Save options
   * @param {options.method}      Save HTTP method
   * @param {options.url}         Save URL
   * @param {options.data}        Save data
   * @param {options.params}      Query params
   * @param {options.headers}     Query headers
   *
   * @returns {Promise}
   */
  store(options: RequestOptions = {}) {
    let data = _.defaultTo(options.data, this.getSaveData());

    if (this.hasFileUpload(data)) {
      data = serialize(data, { indices: true, booleansAsIntegers: true });
    }

    _.assign(options, { data });

    return this.save(options);
  }
}

export type Accessor = (value?: any) => any;
