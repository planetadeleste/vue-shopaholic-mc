/**
 * Afrikaans
 */
export declare const af_za: Bundle;
/**
 * Arabic - Republic of Iraq
 */
export declare const ar_iq: Bundle;
/**
 * English - United States (Default)
 */
export declare const en_us: Bundle;
/**
 * Persian - Islamic Republic of Iran
 */
export declare const fa_ir: Bundle;
/**
 * French
 */
export declare const fr_fr: Bundle;
/**
 * Portuguese - Brazil
 */
export declare const pt_br: Bundle;
/**
 * Dutch - The Netherlands
 */
export declare const nl_nl: Bundle;
/**
 * Polish - Poland
 */
export declare const pl_pl: Bundle;
/**
 * Russian - Russia
 */
export declare const ru_ru: Bundle;
/**
 * Danish - Denmark
 */
export declare const da_dk: Bundle;
/**
 * Indonesian - Indonesia
 */
export declare const id_id: Bundle;
/**
 * German - Germany
 */
export declare const de_de: Bundle;
export interface Bundle {
  locale: string;
  messages: Messages;
}
export interface Messages {
  [key: string]: string;
  after: string;
  alpha: string;
  alphanumeric: string;
  array: string;
  ascii: string;
  base64: string;
  before: string;
  between: string;
  between_inclusive: string;
  boolean: string;
  creditcard: string;
  date: string;
  dateformat: string;
  defined: string;
  email: string;
  empty: string;
  equals: string;
  gt: string;
  gte: string;
  integer: string;
  ip: string;
  isblank: string;
  isnil: string;
  isnull: string;
  iso8601: string;
  json: string;
  length: string;
  length_between: string;
  lt: string;
  lte: string;
  match: string;
  negative: string;
  not: string;
  number: string;
  numeric: string;
  object: string;
  positive: string;
  required: string;
  same: string;
  string: string;
  url: string;
  uuid: string;
}
