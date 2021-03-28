import { AxiosResponse } from "axios";
import { Result } from "vue-mc";

type ResultData<T> = Result<T> & Record<string, any>;

declare class Response<T = any> {
  response?: AxiosResponse;
  constructor(response?: AxiosResponse);
  getData(): ResultData<T>;
  getStatus(): number;
  getHeaders(): any;
  getValidationErrors(): Record<string, any> | null;
}

export default Response;
