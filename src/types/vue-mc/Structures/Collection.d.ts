import Base, { Options, RequestOperation } from "./Base";
import Model, { ValidationResultErrorFinalResult } from "./Model";
import Response from "../HTTP/Response";

type ConstructorOf<A> = new (...args: any[]) => A;

/**
 * Base collection class.
 */
declare class Collection<A extends Model = Model> extends Base {
  models: A[];
  readonly loading: boolean;
  readonly saving: boolean;
  readonly deleting: boolean;
  readonly fatal: boolean;
  private readonly _attributes;
  private readonly _page;
  private readonly _registry;
  /**
   * Accessor to support Array.length semantics.
   */
  get length(): number;
  /**
   * Creates a new instance, called when using 'new'.
   *
   * @param  {Array}  [models]    Models to add to this collection.
   * @param  {Object} [options]   Extra options to set on this collection.
   */
  constructor(
    models?: A[],
    options?: Options,
    attributes?: Record<string, any>
  );
  /**
   * Creates a copy of this collection. Model references are preserved so
   * changes to the models inside the clone will also affect the subject.
   *
   * @returns {Collection}
   */
  clone<T extends Collection>(): T;
  /**
   * @return {A} The class/constructor for this collection's model type.
   */
  model(): ConstructorOf<A>;
  /**
   * @return {Object} Default attributes
   */
  defaults(): Record<string, any>;
  /**
   * @return {*} The value of an attribute, or a given fallback if not set.
   */
  get(attribute: string, fallback?: any): any;
  /**
   * Sets an attribute's value, or an object of attributes.
   *
   * @param {string|Object} attribute
   * @param {*}             value
   */
  set(attribute: string | Record<string, any>, value?: any): void;
  /**
   * @return {Object}
   */
  getAttributes(): Record<string, any>;
  /**
   * @return {A[]}
   */
  getModels(): A[];
  /**
   * Returns the default options for this model.
   *
   * @returns {Object}
   */
  getDefaultOptions(): Options;
  /**
   * @returns {Object} Parameters to use for replacement in route patterns.
   */
  getRouteParameters(): Record<string, any>;
  /**
   * Removes all errors from the models in this collection.
   */
  clearErrors(): void;
  /**
   * Resets model state, ie. `loading`, etc back to their initial states.
   */
  clearState(): void;
  /**
   * Removes all models from this collection.
   */
  clearModels(): void;
  /**
   * Removes all models from this collection.
   */
  clear(): void;
  /**
   * Syncs all models in this collection. This method delegates to each model
   * so follows the same signature and effects as `Model.sync`.
   */
  sync(): void;
  /**
   * Resets all models in this collection. This method delegates to each model
   * so follows the same signature and effects as `Model.reset`.
   *
   * @param {string|string[]} attribute
   */
  reset(...attribute: string[]): void;
  /**
   * Returns the number of models in this collection.
   */
  size(): number;
  /**
   * @returns {boolean} `true` if the collection is empty, `false` otherwise.
   */
  isEmpty(): boolean;
  /**
   * @returns {Object} A native representation of this collection that will
   *                   determine the contents of JSON.stringify(collection).
   */
  toJSON(): A[];
  /**
   * @returns {Promise}
   */
  validate(): Promise<ValidationResultErrorFinalResult[]>;
  /**
   * Create a new model of this collection's model type.
   *
   * @param {Object} attributes
   *
   * @returns {A} A new instance of this collection's model.
   */
  createModel(attributes: Record<string, any>): Record<string, any>;
  /**
   * Removes a model from the model registry.
   *
   * @param {A} model
   */
  removeModelFromRegistry(model: A): void;
  /**
   * @return {Boolean} true if this collection has the model in its registry.
   */
  hasModelInRegistry(model: A): boolean;
  /**
   * Adds a model from the model registry.
   *
   * @param {A} model
   */
  addModelToRegistry(model: A): void;
  /**
   * Called when a model has been added to this collection.
   *
   * @param {A} model
   */
  onAdd(model: A): void;
  /**
   * Adds a model to this collection.
   *
   * This method returns a single model if only one was given, but will return
   * an array of all added models if an array was given.
   *
   * @param {A|Array|Object} model Adds a model instance or plain object,
   *                                   or an array of either, to this collection.
   *                                   A model instance will be created and
   *                                   returned if passed a plain object.
   *
   * @returns {A|Array} The added model or array of added models.
   */
  add(model: A[]): A[];
  add(model?: A | Partial<A> | Record<string, any>): A;
  /**
   * Called when a model has been removed from this collection.
   *
   * @param {A} model
   */
  onRemove(model: A): void;
  /**
     * Removes a model at a given index.
     *
     * @param  {number} index

     * @returns {A} The model that was removed, or `undefined` if invalid.
     * @throws  {Error} If a model could not be found at the given index.
     */
  _removeModelAtIndex(index: number): A | undefined;
  /**
   * Removes a `Model` from this collection.
   *
   * @param  {A} model
   *
   * @return {A}
   */
  _removeModel(model: A): A | undefined;
  /**
   * Removes the given model from this collection.
   *
   * @param  {A|Object|Array} model Model to remove, which can be a `Model`
   *                                    instance, an object to filter by,
   *                                    a function to filter by, or an array
   *                                    of any of the above to remove multiple.
   *
   * @return {A|A[]} The deleted model or an array of models if a filter
   *                         or array type was given.
   *
   * @throws {Error} If the model is an invalid type.
   */
  remove(model: A): A;
  remove(model: A[] | Partial<A> | ((model: A) => boolean)): A[];
  /**
   * Determines whether a given value is an instance of a model.
   *
   * @param  {*} candidate A model candidate
   *
   * @return {boolean} `true` if the given `model` is an instance of Model.
   */
  isModel(candidate: any): boolean;
  /**
   * Returns the zero-based index of the given model in this collection.
   *
   * @see {@link https://lodash.com/docs/#findIndex}
   *
   * @return {number} the index of a model in this collection, or -1 if not found.
   */
  indexOf(model: A): number;
  /**
   * @param {string|function|Object} where
   *
   * @return {A} The first model that matches the given criteria, or
   *                 `undefined` if none could be found.
   *
   * @see {@link https://lodash.com/docs/#find}
   */
  find(where: Predicate): A | undefined;
  /**
   * Creates a new collection of the same type that contains only the models
   * for which the given predicate returns `true` for, or matches by property.
   *
   * @see {@link where}
   *
   * Important: Even though this returns a new collection, the references to
   *            each model are preserved, so changes will propagate to both.
   *
   * @param {function|Object|string} predicate Receives `model`.
   *
   * @returns {Collection}
   */
  filter<T extends Collection>(predicate: Predicate): T;

  /**
   * Returns the models for which the given predicate returns `true` for,
   * or models that match attributes in an object.
   *
   * @see {@link https://lodash.com/docs/#filter}
   *
   * @param {function|Object|string} predicate Receives `model`.
   *
   * @returns {A[]}
   */
  where(predicate: Predicate): A[];
  /**
   * Returns an array that contains the returned result after applying a
   * function to each model in this collection.
   *
   * @see {@link https://lodash.com/docs/#map}
   *
   * @param {function} callback Receives `model`.
   *
   * @return {A[]}
   */
  map<T = A>(callback: string | ((model: A) => T)): T[];
  /**
   * Iterates through all models, calling a given callback for each one.
   *
   * @see {@link https://lodash.com/docs/#each}
   *
   * @param {function} callback Receives `model` and `index`.
   */
  each(callback: (model: A) => void): void;
  /**
   * Reduces this collection to a value which is the accumulated result of
   * running each model through `iteratee`, where each successive invocation
   * is supplied the return value of the previous.
   *
   * If `initial` is not given, the first model of the collection is used
   * as the initial value.
   *
   * @param {function} iteratee Invoked with three arguments:
   *                            (result, model, index)
   *
   * @param {*} [initial] The initial value to use for the `result`.
   *
   * @returns {*} The final value of result, after the last iteration.
   */
  reduce<U = A>(
    iteratee: (result: U | undefined, model: A, index: number) => U,
    initial?: U
  ): U | undefined;
  /**
   * @param {function|string} iteratee Attribute name or callback to determine
   *                                   which values to sum by. Invoked with a
   *                                   single argument `model`.
   *
   * @returns {number} Sum of all models, accessed by attribute or callback.
   */
  sum(iteratee: ((model: A) => number) | string): number;
  /**
   * Returns an object composed of keys generated from the results of running
   * each model through `iteratee`. The corresponding value of each key is the
   * number of times the key was returned by iteratee.
   *
   * @see {@link https://lodash.com/docs/#countBy}
   *
   * @returns {Object}
   */
  count(iteratee: (model: A) => any): Record<string, number>;
  /**
   * Sorts this collection's models using a comparator. This method performs
   * a stable sort (it preserves the original sort order of equal elements).
   *
   * @see {@link https://lodash.com/docs/#sortBy}
   *
   * @param {function|string} comparator Attribute name or attribute function,
   *                                     invoked with a single arg `model`.
   */
  sort(comparator: ((model: A) => any) | string): void;
  /**
   * @param {A|Object} model
   *
   * @returns {boolean} `true` if this collection contains the given model,
   *                    `false` otherwise.
   */
  has(model: A): boolean;
  /**
   * @returns {A|undefined} The first model of this collection.
   */
  first(): A | undefined;
  /**
   * @returns {A|undefined} The last model of this collection.
   */
  last(): A | undefined;
  /**
   * Removes and returns the first model of this collection, if there was one.
   *
   * @returns {A|undefined} Removed model or undefined if there were none.
   */
  shift(): A | undefined;
  /**
   * Removes and returns the last model of this collection, if there was one.
   *
   * @returns {A|undefined} Removed model or undefined if there were none.
   */
  pop(): A | undefined;
  /**
   * Replaces all models in this collection with those provided. This is
   * effectively equivalent to `clear` and `add`, and will result in an empty
   * collection if no models were provided.
   *
   * @param {A|A[]} models Models to replace the current models with.
   */
  replace(models: A | A[]): void;
  /**
   * Returns the query parameters that should be used when paginating.
   *
   * @return {Object}
   */
  getPaginationQuery(): {
    page: number | null;
  };
  /**
   * @inheritDoc
   */
  getFetchQuery(): Record<string, any>;
  /**
   * @param {Object} response
   *
   * @returns {Array|null} Models from the response.
   */
  getModelsFromResponse(response: Response): any;
  /**
   * Called when a save request was successful.
   *
   * @param {Object} response
   */
  onSaveSuccess(response: Response): void;
  /**
   * @returns {A[]} Models in this collection that are in a "saving" state.
   */
  getSavingModels(): A[];
  /**
   * @returns {A[]} Models in this collection that are in a "deleting" state.
   */
  getDeletingModels(): A[];
  /**
   * Applies an array of validation errors to this collection's models.
   *
   * @param  {Array}   errors
   * @param  {integer} status Response status
   */
  applyValidationErrorArray(errors: any[]): void;
  /**
   * Applies an object of validation errors keyed by model identifiers.
   *
   * @param  {Array}   errors
   * @param  {integer} status Response status
   */
  applyValidationErrorObject(
    errors: Record<string, Record<string, string | string[]>>
  ): void;
  /**
   * Sets validation errors on this collection's models.
   *
   * @param {Array|Object} errors Either an array of length equal to the number
   *                              of models in this collection, or an object
   *                              of errors keyed by model identifiers.
   */
  setErrors(
    errors: any[] | Record<string, Record<string, string | string[]>>
  ): void;
  /**
   * @returns {Array} An array of this collection's validation errors.
   */
  getErrors(): Record<string, string | string[]>[];
  /**
   * Called when a save request resulted in a validation error.
   *
   * @param {Object} response
   */
  onSaveValidationFailure(error: any): void;
  /**
   * Called when a save request resulted in an unexpected error,
   * eg. an internal server error (500)
   *
   * @param {Error}  error
   * @param {Object} response
   */
  onFatalSaveFailure(error: any, response?: any): void;
  /**
   * Called when a save request failed.
   *
   * @param {Error}  error
   * @param {Object} response
   */
  onSaveFailure(error: any): void;
  /**
   * @returns {Array} The data to use for saving.
   */
  getSaveData(): Record<string, any>;
  /**
   * Sets the page on this collection, enabling pagination. To disable
   * pagination on this collection, pass page as `null` or `undefined`.
   *
   * @param {number|boolean} [page] Page number, or `null` to disable.
   *
   * @returns {Collection} This collection.
   */
  page<T extends Collection>(page: number | boolean): T;
  /**
   * @returns {integer|null} The page that this collection is on.
   */
  getPage(): number | null;
  /**
   * @returns {boolean} Whether this collection is currently paginated.
   */
  isPaginated(): boolean;
  /**
   * @returns {boolean} Whether this collection is on the last page,
   *                            ie. there won't be more results that follow.
   */
  isLastPage(): boolean;
  /**
   * Responsible for adjusting the page and appending of models that were
   * received by a paginated fetch request.
   *
   * @param {A[]} models
   */
  applyPagination(models: A[]): void;
  /**
   * Called when a fetch request was successful.
   *
   * @param {Object} response
   */
  onFetchSuccess(response: Response): void;
  /**
   * Called when a fetch request failed.
   *
   * @param {Error}  error
   */
  onFetchFailure(error: any): void;
  /**
   * Called before a fetch request is made.
   *
   * @returns {boolean|undefined} `false` if the request should not be made.
   */
  onFetch(): Promise<RequestOperation>;
  /**
   * Called when a delete request was successful.
   *
   * @param {Object} response
   */
  onDeleteSuccess(response: Response): void;
  /**
   * Called when a delete request resulted in a general error.
   *
   * @param {Error}  error
   * @param {Object} response
   */
  onDeleteFailure(error: any): void;
  /**
   * Called before a save request is made.
   *
   * @returns {boolean} Either `true` or false` if the request should not be
   *                    made, where `true` indicates that the request should
   *                    be considered a "success" rather than a "cancel".
   *
   */
  onSave(): Promise<RequestOperation>;
  /**
   * Collect all model identifiers.
   *
   * @returns {Array}
   */
  getIdentifiers(models: A[]): string[];
  /**
   * @inheritDoc
   */
  getDeleteBody(): string[] | {};
  /**
   * @returns {string} The query parameter key to use for model identifiers.
   */
  getDeleteQueryIdenitifierKey(): string;
  /**
   * @inheritDoc
   */
  getDeleteQuery(): Record<string, string>;
  /**
   * Called before a delete request is made.
   *
   * @returns {boolean} `false` if the request should not be made.
   */
  onDelete(): Promise<RequestOperation>;
  /**
   * Convert collection to Array. All models inside are converted to JSON
   *
   * @return {object[]} converted collection
   */
  toArray(): Record<string, any>[];
}
export default Collection;
export declare type Predicate<T = boolean> =
  | ((model: Model) => T)
  | string
  | Record<string, any>
  | Model
  | Partial<Model>;
