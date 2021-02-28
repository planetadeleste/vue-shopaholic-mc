export interface Result<T = Record<string, any>> {
  status: boolean;
  data: T;
  message: string | null;
  code: string | null;
}
