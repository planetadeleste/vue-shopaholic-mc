import Request from "../HTTP/Request";
import Response from "../HTTP/Response";
import RequestError from "../Errors/RequestError";
import ResponseError from "../Errors/ResponseError";
import ValidationError, { Errors } from "../Errors/ValidationError";
import { AxiosRequestConfig, Method } from "axios";
import Model from "./Model";
import { BaseResponse } from "../HTTP/BaseResponse";
export declare enum RequestOperation {
  REQUEST_CONTINUE = 0,
  REQUEST_REDUNDANT = 1,
  REQUEST_SKIP = 2
}
/**
 * Base class for all things common between Model and Collection.
 */
declare abstract class Base {
  static readonly REQUEST_CONTINUE = RequestOperation.REQUEST_CONTINUE;
  static readonly REQUEST_REDUNDANT = RequestOperation.REQUEST_REDUNDANT;
  static readonly REQUEST_SKIP = RequestOperation.REQUEST_SKIP;
  readonly _uid: string;
  private readonly _listeners;
  private readonly _options;
  protected constructor(options: Options);
  /**
   * @returns {string} The class name of this instance.
   */
  get $class(): string;
  /**
   * Called after construction, this hook allows you to add some extra setup
   * logic without having to override the constructor.
   */
  boot(): void;
  /**
   * Returns a route configuration in the form {key: name}, where key may be
   * 'save', 'fetch', 'delete' or any other custom key, and the name is what
   * will be passed to the route resolver to generate the URL. See @getURL
   *
   * @returns {Object}
   */
  routes(): Routes;
  /**
   * Returns the default context for all events emitted by this instance.
   *
   * @returns {Object}
   */
  getDefaultEventContext(): {
    target: Base;
  };
  /**
   * @returns {string} Default string representation.
   */
  toString(): string;
  /**
     * Emits an event by name to all registered listeners on that event.

     * Listeners will be called in the order that they were added. If a listener
     * returns `false`, no other listeners will be called.
     *
     * @param {string} event    The name of the event to emit.
     * @param {Object} context  The context of the event, passed to listeners.
     */
  emit(event: string, context?: Record<string, any>): void;
  /**
   * Registers an event listener for a given event.
   *
   * Event names can be comma-separated to register multiple events.
   *
   * @param {string}   event      The name of the event to listen for.
   * @param {function} listener   The event listener, accepts context.
   */
  on(event: string, listener: Listener): void;
  /**
   * @returns {Object} Parameters to use for replacement in route patterns.
   */
  getRouteParameters(): Record<string, string>;
  /**
   * @returns {RegExp|string} Pattern to match and group route parameters.
   */
  getRouteParameterPattern(): RegExp | string;
  /**
   * @returns {RegExp} The default route parameter pattern.
   */
  getDefaultRouteParameterPattern(): RegExp;
  /**
   * @returns {Object} This class' default options.
   */
  getDefaultOptions(): Options;
  /**
   * @param {Array|string} path     Option path resolved by `get`
   * @param {*}            fallback Fallback value if the option is not set.
   *
   * @returns {*} The value of the given option path.
   */
  getOption(path: string | string[], fallback?: any): any;
  /**
   * @returns {Object} This instance's default options.
   */
  options(): Options;
  /**
   * Sets an option.
   *
   * @param {string} path
   * @param {*}      value
   */
  setOption(path: string, value: any): void;
  /**
   * Sets all given options. Successive values for the same option won't be
   * overwritten, so this follows the 'defaults' behaviour, and not 'merge'.
   *
   * @param {...Object} options One or more objects of options.
   */
  setOptions(...options: Options[]): void;
  /**
   * Returns all the options that are currently set on this instance.
   *
   * @return {Object}
   */
  getOptions(): Options;
  /**
   * Returns a function that translates a route key and parameters to a URL.
   *
   * @returns {Function} Will be passed `route` and `parameters`
   */
  getRouteResolver(): RouteResolver;
  /**
   * @returns {Object} An object consisting of all route string replacements.
   */
  getRouteReplacements(
    route: string,
    parameters?: Record<string, string>
  ): Record<string, string>;
  /**
   * Returns the default URL provider, which assumes that route keys are URL's,
   * and parameter replacement syntax is in the form "{param}".
   *
   * @returns {Function}
   */
  getDefaultRouteResolver(): RouteResolver;
  /**
   * @returns {Object} The data to send to the server when saving this model.
   */
  getDeleteBody(): any;
  /**
   * @returns {Object} Query parameters that will be appended to the `fetch` URL.
   */
  getFetchQuery(): Record<string, any>;
  /**
   * @returns {Object} Query parameters that will be appended to the `save` URL.
   */
  getSaveQuery(): Record<string, any>;
  /**
   * @returns {Object} Query parameters that will be appended to the `delete` URL.
   */
  getDeleteQuery(): Record<string, any>;
  /**
   * @returns {string} The key to use when generating the `fetch` URL.
   */
  getFetchRoute(): string;
  /**
   * @returns {string} The key to use when generating the `save` URL.
   */
  getSaveRoute(): string;
  /**
   * @returns {string} The key to use when generating the `delete` URL.
   */
  getDeleteRoute(): string;
  /**
   * @returns {Object} Headers to use when making any request.
   */
  getDefaultHeaders(): Record<string, any>;
  /**
   * @returns {Object} Headers to use when making a save request.
   */
  getSaveHeaders(): Record<string, any>;
  /**
   * @returns {Object} Headers to use when making a fetch request.
   */
  getFetchHeaders(): Record<string, any>;
  /**
   * @returns {Object} Headers to use when making a delete request.
   */
  getDeleteHeaders(): Record<string, any>;
  /**
   * @returns {Object} Default HTTP methods.
   */
  getDefaultMethods(): object;
  /**
   * @returns {string} HTTP method to use when making a save request.
   */
  getSaveMethod(): Method;
  /**
   * @returns {string} HTTP method to use when making a fetch request.
   */
  getFetchMethod(): Method;
  /**
   * @returns {string} HTTP method to use when updating a resource.
   */
  getUpdateMethod(): Method;
  /**
   * @returns {string} HTTP method to use when patching a resource.
   */
  getPatchMethod(): Method;
  /**
   * @returns {string} HTTP method to use when creating a resource.
   */
  getCreateMethod(): Method;
  /**
   * @returns {string} HTTP method to use when deleting a resource.
   */
  getDeleteMethod(): Method;
  /**
   * @returns {number} The HTTP status code that indicates a validation error.
   */
  getValidationErrorStatus(): number;
  /**
   * @returns {boolean} `true` if the response indicates a validation error.
   */
  isBackendValidationError(error: RequestError | any): boolean;
  /**
   * @return {string|undefined} Route value by key.
   */
  getRoute(key: string, fallback?: string): string;
  /**
   * @returns {string} The full URL to use when making a fetch request.
   */
  getFetchURL(): string;
  /**
   * @returns {string} The full URL to use when making a save request.
   */
  getSaveURL(): string;
  /**
   * @returns {string} The full URL to use when making a delete request.
   */
  getDeleteURL(): string;
  /**
   * @param {string} route      The route key to use to generate the URL.
   * @param {Object} parameters Route parameters.
   *
   * @returns {string} A URL that was generated using the given route key.
   */
  getURL(route: string, parameters?: Record<string, any>): string;
  /**
   * @returns {Request} A new `Request` using the given configuration.
   */
  createRequest(config: AxiosRequestConfig): Request;
  /**
   * Creates a request error based on a given existing error and optional response.
   */
  createRequestError(error: any, response: Response): RequestError;
  /**
   * Creates a response error based on a given existing error and response.
   */
  createResponseError(error: any, response?: Response): ResponseError;
  /**
   * Creates a validation error using given errors and an optional message.
   */
  createValidationError(
    errors: Errors | Errors[],
    message?: string
  ): ValidationError;
  /**
   * This is the central component for all HTTP requests and handling.
   *
   * @param  {Object}     config      Request configuration
   * @param  {function}   onRequest   Called before the request is made.
   * @param  {function}   onSuccess   Called when the request was successful.
   * @param  {function}   onFailure   Called when the request failed.
   */
  request(
    config: AxiosRequestConfig | (() => AxiosRequestConfig),
    onRequest: OnRequestCallback,
    onSuccess: RequestSuccessCallback,
    onFailure: RequestFailureCallback
  ): Promise<Response | null>;
  abstract onFetch(): Promise<RequestOperation>;
  abstract onFetchFailure(error: any, response: Response | undefined): void;
  abstract onFetchSuccess(response: Response | null): void;
  /**
   * Fetches data from the database/API.
   *
   * @param {options}             Fetch options
   * @param {options.method}      Fetch HTTP method
   * @param {options.url}         Fetch URL
   * @param {options.params}      Query params
   * @param {options.headers}     Query headers
   *
   * @returns {Promise}
   */
  fetch(options?: RequestOptions): Promise<Response | null>;
  abstract getSaveData(): Record<any, any>;
  abstract onSave(): Promise<RequestOperation>;
  abstract onSaveFailure(error: any, response: Response | undefined): void;
  abstract onSaveSuccess(response: BaseResponse | null): void;
  /**
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
  save(options?: RequestOptions): Promise<Response | null>;
  /**
   * Converts given data to FormData for uploading.
   *
   * @param  {Object} data
   * @returns {FormData}
   */
  convertObjectToFormData(data: Record<string, string | Blob>): FormData;
  /**
   * Persists data to the database/API using FormData.
   *
   * @param {options}             Save options
   * @param {options.method}      Save HTTP method
   * @param {options.url}         Save URL
   * @param {options.params}      Query params
   * @param {options.headers}     Query headers
   *
   * @returns {Promise}
   */
  upload(options?: Record<any, any>): Promise<Response | null>;
  abstract onDelete(): Promise<RequestOperation>;
  abstract onDeleteFailure(error: any, response: Response | undefined): void;
  abstract onDeleteSuccess(response: Response | null): void;
  /**
   * Removes model or collection data from the database/API.
   *
   * @param {options}             Delete options
   * @param {options.method}      Delete HTTP method
   * @param {options.url}         Delete URL
   * @param {options.params}      Query params
   * @param {options.headers}     Query headers
   *
   * @returns {Promise}
   */
  delete(options?: RequestOptions): Promise<Response | null>;
}
export default Base;
export interface Options {
  [key: string]: any;
  model?: typeof Model;
  methods?: Partial<Record<RequestType, HttpMethods>>;
  routeParameterPattern?: RegExp;
  useDeleteBody?: boolean;
}
export declare type Routes = Record<
  "fetch" | "save" | "delete" | string,
  string
>;
export declare type Listener = (context: Record<string, any>) => void;
export declare type RouteResolver = (
  route: string,
  parameters: Record<string, string>
) => string;
export declare type RequestFailureCallback = (
  error: any,
  response: Response | undefined
) => void;
export declare type RequestSuccessCallback = (
  response: Response | null
) => void;
export declare type OnRequestCallback = () => Promise<number | boolean>;
export declare type HttpMethods =
  | "GET"
  | "POST"
  | "PATCH"
  | "PUT"
  | "DELETE"
  | string;
export declare type RequestType =
  | "fetch"
  | "save"
  | "update"
  | "create"
  | "patch"
  | "delete"
  | string;
export interface RequestOptions {
  url?: string;
  method?: Method;
  data?: any;
  params?: Record<string, any>;
  headers?: Record<string, any>;
}
