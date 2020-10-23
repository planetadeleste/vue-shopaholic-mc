import Vue from "vue";
import Base from "./Base";
import { Model as BaseModel } from "vue-mc";
import { AxiosRequestConfig } from "axios";
import Request from "./Request";
import _ from "lodash";

type Constructor<T> = new (...args: any[]) => T;

export interface RelationConfig {
  class: Constructor<Model>;
  foreignKey?: string;
  localKey?: string;
  aliases?: string[];
}

export default class Model extends BaseModel {
  private _relations!: Record<string, Constructor<Model>>;
  private _baseClass!: Base;
  private _base() {
    if (!this._baseClass) {
      this._baseClass = new Base();
    }

    return this._baseClass;
  }

  boot() {
    this._base();
    Vue.set(this, "_relations", {});
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
}
