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
export {
  Mutation,
  AttributesValidationErrors,
  ValidationResultError,
  ValidationResult,
  ValidationTask
} from "./Structures/Model";
export { Predicate } from "./Structures/Collection";

import Response from "./HTTP/Response";
import ProxyResponse from "./HTTP/ProxyResponse";
import ResponseError from "./Errors/ResponseError";
import Request from "./HTTP/Request";
import RequestError from "./Errors/RequestError";
import ValidationError from "./Errors/ValidationError";

export {
  Response,
  ResponseError,
  Request,
  RequestError,
  ProxyResponse,
  ValidationError
};

export * from "./HTTP/BaseResponse";
export * from "./Validation";
export * from "./Validation/locale";
export * from "./Result";
