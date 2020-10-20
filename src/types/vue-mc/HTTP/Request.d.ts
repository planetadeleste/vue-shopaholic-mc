import Response from "./Response";
import RequestError from "../Errors/RequestError";
import { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
export default class Request {
  config: AxiosRequestConfig;
  constructor(config: AxiosRequestConfig);
  /**
   * Creates a custom response using a given Axios response.
   */
  createResponse(axiosResponse?: AxiosResponse): Response;
  /**
   * Creates a custom response error using a given Axios response error.
   */
  createError(axiosError: AxiosError): RequestError;
  /**
   * @returns {Promise}
   */
  send(): Promise<Response>;
}
