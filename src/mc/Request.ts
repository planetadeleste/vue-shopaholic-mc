import { Response, Request as RequestBase } from "vue-mc";
import axios, { AxiosStatic, AxiosError } from "axios";

export default class Request extends RequestBase {
  $http: AxiosStatic = axios;

  /**
   * @returns {Promise}
   */
  send(): Promise<Response> {
    return this.$http
      .request(this.config)
      .then(this.createResponse)
      .catch((error: AxiosError): never => {
        throw this.createError(error);
      });
  }
}
