import {
  ApiMetaResponse,
  ApiLinksResponse
} from "@bit/planetadeleste.shopaholic.types.api";

export interface Result<T = Record<string, any>> {
  status: boolean;
  data: T;
  message: string | null;
  code: string | null;
  links?: ApiLinksResponse[];
  meta?: ApiMetaResponse[];
}
