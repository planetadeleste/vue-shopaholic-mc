import Base, { HttpMethods, Options, RequestOperation } from "./Base";
import Collection from "./Collection";
import ResponseError from "../Errors/ResponseError";
import Response from "../HTTP/Response";
import { Rule } from "../Validation";
import ProxyResponse from "../HTTP/ProxyResponse";
import { Method } from "axios";
/**
 * Base model class.
 */
declare class Model extends Base {
  [key: string]: any;
  readonly loading: boolean;
  readonly saving: boolean;
  readonly deleting: boolean;
  readonly fatal: boolean;

  private readonly _attributes: Record<string, any>;
  private readonly _collections: Collection[];
  private readonly _reference: Record<string, any>;
  private readonly _errors: Record<string, string[]>;
  private _mutations: Record<string, Mutation>;
  /**
   * A convenience wrapper around the model's attributes that are saved.
   * This is similar to the `saved` method, but instead of accessing a single
   * property it returns the whole saved object, so that you can do something
   * like model.$.attribute when you want to display it somewhere.
   *
   * @returns {Object} This model's saved, reference data.
   */
  get $(): Record<string, any>;
  /**
   * @returns {Object} This model's "active" state attributes.
   */
  get attributes(): Record<string, any>;
  /**
   * @returns {Object} The collection that this model is registered to.
   */
  get collections(): Collection[];
  /**
   * @returns {Object} This model's errors, which are cleared automatically.
   */
  get errors(): Record<string, string | string[]>;
  /**
   * Creates a new instance, called when using 'new'.
   *
   * @param  {Object}     [attributes]  Model attributes
   * @param  {Collection} [collection]  Collection that this model belongs to.
   * @param  {Object}     [options]     Options to set on the model.
   */
  constructor(
    attributes?: Record<string, any>,
    collection?: Collection | null,
    options?: Record<string, any>
  );
  /**
   * Creates a copy of this model, with the same attributes and options. The
   * clone will also belong to the same collections as the subject.
   *
   * @returns {Model}
   */
  clone<T extends Model>(): T;
  /**
   * Prepare certain methods to only be called once. These are methods that
   * are expected to return the same data every time.
   *
   * @see {@link https://lodash.com/docs/#once}
   */
  memoize(): void;
  /**
   * Returns the model's identifier value.
   */
  identifier(): string;
  /**
   * @returns {Object} An empty representation of this model.
   *                   It's important that all model attributes have a default
   *                   value in order to be reactive in Vue.
   */
  defaults(): Record<string, any>;
  /**
   * @returns {Object} Attribute mutations keyed by attribute name.
   */
  mutations(): Record<string, Mutation | Mutation[]>;
  /**
   * Add validation rules here, or use option?
   */
  validation(): Record<string, Rule>;
  /**
   * Returns the default options for this model.
   *
   * @returns {Object}
   */
  getDefaultOptions(): ModelOptions;
  /**
   * Compiles all mutations into pipelines that can be executed quickly.
   */
  compileMutators(): void;
  /**
   * @returns {Object} Parameters to use for replacement in route patterns.
   */
  getRouteParameters(): Record<string, any>;
  /**
   * Registers a collection on this model. When this model is created it will
   * automatically be added to the collection. Similarly, when this model is
   * delete it will be remove from the collection. Registering the same
   * collection more than once has no effect.
   *
   * @param {Collection} collection
   */
  registerCollection(collection: Collection | Collection[]): void;
  /**
   * Removes a collection from this model's collection registry, removing all
   * effects that would occur when creating or deleting this model.
   *
   * Unregistering a collection that isn't registered has no effect.
   *
   * @param {Collection} collection
   */
  unregisterCollection(collection: Collection): void;
  /**
   * Reverts all attributes back to their defaults, and completely removes all
   * attributes that don't have defaults. This will also sync the reference
   * attributes, and is not reversable.
   */
  clearAttributes(): void;
  /**
   * Reverts all attributes back to their defaults, and completely removes all
   * attributes that don't have defaults. This will also sync the reference
   * attributes, and is not reversable.
   */
  clear(): void;
  /**
   * Resets model state, ie. `loading`, etc back to their initial states.
   */
  clearState(): void;
  /**
   * Assigns all given model data to the model's attributes and reference.
   * This will also fill any gaps using the model's default attributes.
   *
   * @param {Object} attributes
   *
   * @returns {Object} The attributes that were assigned to the model.
   */
  assign(attributes: Record<string, any>): void;
  /**
   * Resets all attributes back to their reference values (source of truth).
   * A good use case for this is when form fields are bound directly to the
   * model's attributes. Changing values in the form fields will change the
   * attributes on the model. On cancel, you can revert the model back to
   * its saved, original state using reset().
   *
   * You can also pass one or an array of attributes to reset.
   *
   * @param {string|string[]} attribute
   */
  reset(attribute: string | string[]): void;
  /**
   * @returns {*} The value of an attribute after applying its mutations.
   */
  mutated(attribute: string, value: any): any;
  /**
   * Mutates either specific attributes or all attributes if none provided.
   * @param {string|string[]|undefined} attribute
   */
  mutate(attribute?: string | string[]): void;
  /**
   * Sync the current attributes to the reference attributes. This is usually
   * only called on save. We have to clone the values otherwise we
   * end up with references to the same object in both attribute sets.
   *
   * You can also pass one or an array of attributes to sync.
   *
   * @param {string|string[]} attribute
   */
  sync(attribute?: string | string[]): void;
  /**
   * Registers an attribute on this model so that it can be accessed directly
   * on the model, passing through `get` and `set`.
   */
  registerAttribute(attribute: string): void;
  /**
   * Sets the value of an attribute and registers the magic "getter" in a way
   * that is compatible with Vue's reactivity. This method should always be
   * used when setting the value of an attribute.
   *
   * @param  {string|Object}  attribute
   * @param  {*}              value
   *
   * @returns {*} The value that was set.
   */
  set<T = any>(
    attribute: string | Record<string, any>,
    value?: T
  ): T | undefined;
  /**
   * Reverts all attributes back to their defaults, or `undefined` if a
   * default value is not defined.
   *
   * You can also pass one or an array of attributes to unset.
   *
   * @param {string|string[]} attribute
   */
  unset(attribute: string | string[]): void;
  /**
   * Similar to `saved`, returns an attribute's value or a fallback value
   * if this model doesn't have the attribute.
   *
   * @param {string} attribute
   * @param {*}      fallback
   *
   * @returns {*} The value of the attribute or `fallback` if not found.
   */
  get(attribute: string, fallback?: any): any;
  /**
   * Similar to `get`, but accesses the saved attributes instead.
   *
   * This is useful in cases where you want to display an attribute but also
   * change it. For example, a modal with a title based on a model field, but
   * you're also editing that field. The title will be updating reactively if
   * it's bound to the active attribute, so bind to the saved one instead.
   *
   * @param {string} attribute
   * @param {*}      fallback
   *
   * @returns {*} The value of the attribute or `fallback` if not found.
   */
  saved(attribute: string, fallback?: any): any;
  /**
   * Determines if the model has an attribute.
   *
   * @param  {string}  attribute
   * @returns {boolean} `true` if an attribute exists, `false` otherwise.
   *                   Will return true if the object exists but is undefined.
   */
  has(attribute: string): boolean;
  /**
   * @return {Array}
   */
  getValidateRules(attribute: string): Rule[];
  /**
   * Validates a specific attribute of this model, and sets errors for it.
   *
   * @returns {boolean} `true` if valid, `false` otherwise.
   */
  validateAttribute(
    attribute: string
  ): Promise<ValidationResultErrorFinalResult>;
  /**
   * Validates all attributes.
   *
   * @param {Object} [attributes] One or more attributes to validate.
   *
   * @returns {Promise}
   */
  validate(
    attributes?: string | string[]
  ): Promise<ValidationResultErrorFinalResult>;
  /**
   * @returns {Object} A native representation of this model that will determine
   *                   the contents of JSON.stringify(model).
   */
  toJSON(): Record<string, any>;
  /**
   * Adds this model to all registered collections.
   */
  addToAllCollections(): void;
  /**
   * Removes this model from all registered collections.
   */
  removeFromAllCollections(): void;
  /**
   * Returns an array of attribute names that have changed, or `false` if no
   * changes have been made since the last time this model was synced.
   *
   * @returns {Array|boolean} An array of changed attribute names, or `false`
   *                         if no attributes have changed since the last sync.
   */
  changed(): string[] | false;
  /**
   * Called when a fetch request was successful.
   */
  onFetchSuccess(response: Response): void;
  /**
   * Called when a fetch request failed.
   *
   * @param {Error}  error
   */
  onFetchFailure(error: any): void;
  /**
   * @returns {string} The key to use when generating the `patch` URL.
   */
  getPatchRoute(): Method;
  /**
   * @returns {string} The key to use when generating the `create` URL.
   */
  getCreateRoute(): Method;
  /**
   * @returns {string} The key to use when generating the `update` URL.
   */
  getUpdateRoute(): Method;
  /**
   * @returns {string} The method to use when making an update request.
   */
  getUpdateMethod(): Method;
  /**
   * @returns {string} The method to use when making an save request.
   */
  getSaveMethod(): Method;
  /**
   * @inheritDoc
   */
  getSaveRoute(): Method;
  /**
   * Returns whether this model should perform a "patch" on update, which will
   * only send changed data in the request, rather than all attributes.
   *
   * @returns {boolean} Whether this model should perform a "patch" on update,
   *                    which will only send changed data in the request,
   *                    rather than all attributes.
   */
  shouldPatch(): boolean;
  /**
   * @returns {Object} The data to send to the server when saving this model.
   */
  getSaveData(): Record<string, any>;
  /**
   * @returns {*} A potential identifier parsed from response data.
   */
  parseIdentifier(data: any): any;
  /**
   * @returns {boolean} Whether the given identifier is considered a valid
   *                   identifier value for this model.
   */
  isValidIdentifier(identifier: any): boolean;
  /**
   * @returns {boolean} Whether this model allows an existing identifier to be
   *                    overwritten on update.
   */
  shouldAllowIdentifierOverwrite(): boolean;
  /**
   * Updates the model data with data returned from the server.
   *
   * @param {Object} response
   */
  update(data: Record<string, any>): void;
  /**
   * Sets errors for a specific attribute. Support the ability to clear error
   * by passing an empty value.
   *
   * @param {string}       attribute
   * @param {string|array} errors
   */
  setAttributeErrors(
    attribute: string,
    errors?: string | string[] | ValidationResultError[]
  ): void;
  /**
   * Sets the errors on this model.
   *
   * @param {Object} errors
   */
  setErrors(errors?: Record<string, string | string[]>): void;
  /**
   * @returns {Object} Validation errors on this model.
   */
  getErrors(): Record<string, string | string[]>;
  /**
   * Clears all errors on this model.
   */
  clearErrors(): void;
  /**
   * Called when a save request was successful.
   *
   * @param {Object|null} response
   */
  onSaveSuccess(response: ProxyResponse): void;
  /**
   * Called when a save request resulted in a validation error.
   *
   * @param {Object} errors
   */
  onSaveValidationFailure(error: ResponseError): void;
  /**
   * Called when a save request resulted in an unexpected error,
   * eg. an internal server error (500)
   *
   * @param {Error}  error
   * @param {Object} response
   */
  onFatalSaveFailure(error: any, response: Response | undefined): void;
  /**
   * Called when a save request resulted in a general error.
   *
   * @param {Error}  error
   * @param {Object} response
   */
  onSaveFailure(error: any, response: Response | undefined): void;
  /**
   * Called when a delete request was successful.
   */
  onDeleteSuccess(response: Response): void;
  /**
   * Called when a delete request resulted in a general error.
   *
   * @param {Error}  error
   */
  onDeleteFailure(error: any): void;
  /**
   * Called before a fetch request is made.
   *
   * @returns {boolean|undefined} `false` if the request should not be made.
   */
  onFetch(): Promise<RequestOperation>;
  /**
   * @returns {boolean} whether this model is not persisted yet, ie. has not
   *                    been created yet. The default test is to check if the
   *                    model's identifier is missing.
   */
  isNew(): boolean;
  /**
   * @returns {boolean} the opposite of `isNew`, returns `true` if this model
   *                    is already persisted somewhere else.
   */
  isExisting(): boolean;
  /**
   * Called before a save request is made.
   *
   * @returns {boolean} `false` if the request should not be made.
   */
  onSave(): Promise<RequestOperation>;
  /**
   * Called before a delete request is made.
   *
   * @returns {boolean} `false` if the request should not be made.
   */
  onDelete(): Promise<RequestOperation>;
}
export default Model;
interface ModelOptions extends Options {
  [key: string]: any;
  methods?: {
    [key: string]: HttpMethods;
  };
  /**
   * The attribute that should be used to uniquely identify this model.
   */
  identifier?: string;
  /**
   * Whether this model should allow an existing identifier to be
   * overwritten on update.
   */
  overwriteIdentifier?: boolean;
  /**
   * Route parameter matching pattern.
   */
  routeParameterPattern?: RegExp;
  /**
   * Whether this model should perform a "patch" on update,
   * which will only send changed attributes in the request.
   */
  patch?: boolean;
  /**
   * Whether this model should save even if no attributes have changed
   * since the last time they were synced. If set to `false` and no
   * changes have been made, the request will be considered a success.
   */
  saveUnchanged?: boolean;
  /**
   * Whether this model should only use the first validation error it
   * receives, rather than an array of errors.
   */
  useFirstErrorOnly?: boolean;
  /**
   * Whether this model should validate an attribute that has changed.
   * This would only affect the errors of the changed attribute and
   * will only be applied if the value is not a blank string.
   */
  validateOnChange?: boolean;
  /**
   * Whether this model should be validated before it is saved. This
   * will cause the request to fail if validation does not pass. This
   * is useful when you only want to validate on demand.
   */
  validateOnSave?: boolean;
  /**
   * Whether this model should validate models and collections within
   * its attribute tree. The result is implicit recursion as each of
   * those instances will also validate their trees, etc.
   */
  validateRecursively?: boolean;
  /**
   * Whether this model should mutate a property as it is changed,
   * before it is set. This is a rare requirement because you usually
   * don't  want to mutate something that you are busy editing.
   */
  mutateOnChange?: boolean;
  /**
   * Whether this model should mutate all attributes before they are
   * synced to the "saved" state. This would include construction,
   * on fetch, on save, and on assign.
   */
  mutateBeforeSync?: boolean;
  /**
   * Whether this model should use mutated values for the attributes
   * in "save" request. This will not mutate the active state.
   */
  mutateBeforeSave?: boolean;
}
export declare type Mutation = (value: any) => any;
export declare type ValidationTask = true | string | Promise<ValidationResult>;
export declare type ValidationResult =
  | true
  | string
  | AttributesValidationErrors
  | (string | AttributesValidationErrors)[];
export declare type ValidationResultError = string | AttributesValidationErrors;
export declare type ValidationResultErrorFinalResult =
  | ValidationResultError
  | ValidationResultError[];
export interface AttributesValidationErrors {
  [key: string]: ValidationResultErrorFinalResult;
}
