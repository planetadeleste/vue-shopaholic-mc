/**
 * Models and Collections for Vue.js
 *
 * @version 0.2.3
 *
 * @author Rudi Theunissen <rudi.theunissen@figured.com>
 */
import Model from "./Structures/Model";
import Collection from "./Structures/Collection";

export { Model, Collection };

export * from "./Structures/Base";
export * from "./Structures/Model";
export { Predicate } from "./Structures/Collection";

import Response from "./HTTP/Response";
import ProxyResponse from "./HTTP/ProxyResponse";
import Request from "./HTTP/Request";
import ResponseError from "./Errors/ResponseError";
import RequestError from "./Errors/RequestError";
import ValidationError from "./Errors/ValidationError";

export {
  Response,
  ProxyResponse,
  Request,
  ResponseError,
  RequestError,
  ValidationError,
};
export { BaseResponse } from "./HTTP/BaseResponse";

export * from "./Validation";
export * from "./Validation/locale";

export * from "./Result";
export * from "./utils";
