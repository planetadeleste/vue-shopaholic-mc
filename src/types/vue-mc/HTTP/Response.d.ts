import { AxiosResponse } from "axios";
declare class Response {
  response?: AxiosResponse;
  constructor(response?: AxiosResponse);
  getData(): any | null;
  getStatus(): number;
  getHeaders(): any;
  getValidationErrors(): Record<string, any> | null;
}
export default Response;
