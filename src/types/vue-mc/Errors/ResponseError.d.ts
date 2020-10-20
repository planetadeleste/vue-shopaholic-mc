import Response from "../HTTP/Response";
export default class ResponseError {
  message: string;
  response?: Response;
  stack?: string;
  constructor(message: string, response?: Response);
  toString(): string;
  getResponse(): Response | undefined;
}
