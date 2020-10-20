export default class ValidationError {
  message: string;
  errors: Errors | Errors[];
  stack?: string;
  constructor(errors: Errors | Errors[], message?: string);
  toString(): string;
  getValidationErrors(): Errors | Errors[];
}
export declare type Errors = Record<string, string | string[]>;
