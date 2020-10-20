import Response from "../HTTP/Response";
export default class RequestError {
  message: string;
  error: any;
  response: Response;
  stack?: string;
  constructor(error: any, response: Response);
  toString(): string;
  getError(): any;
  getResponse(): Response;
}
