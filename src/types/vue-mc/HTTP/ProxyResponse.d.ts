export default class ProxyResponse {
  data: Record<string, any>;
  headers: Record<string, any>;
  status: number;
  constructor(
    status: number,
    data?: Record<string, any>,
    headers?: Record<string, any>
  );
  getData(): Record<string, any>;
  getStatus(): number;
  getHeaders(): Record<string, any>;
  getValidationErrors(): Record<string, any>;
}
