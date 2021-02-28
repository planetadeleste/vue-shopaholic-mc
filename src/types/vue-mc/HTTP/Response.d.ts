import { AxiosResponse } from "axios";
declare class Response<T = any | null> {
  response?: AxiosResponse;
  constructor(response?: AxiosResponse);
  getData(): T;
  getStatus(): number;
  getHeaders(): any;
  getValidationErrors(): Record<string, any> | null;
}
export default Response;
