/// <reference types="lodash" />
import { Bundle } from "./locale";
import Model from "../Structures/Model";
declare class GlobalMessages {
  $locale: string;
  $fallback: string;
  $locales: Record<string, Bundle>;
  constructor();
  /**
   * Resets everything to the default configuration.
   */
  reset(): void;
  /**
   * Sets the active locale.
   *
   * @param {string} locale
   */
  locale(locale: string): void;
  /**
   * Registers a language pack.
   */
  register(bundle: Bundle): void;
  /**
   * Replaces or adds a new message for a given name and optional locale.
   *
   * @param {string} name
   * @param {string} format
   * @param {string} locale
   */
  set(name: string, format: string, locale: string): void;
  /**
   * Returns a formatted string for a given message name and context data.
   *
   * @param {string} name
   * @param {Object} data
   *
   * @returns {string} The formatted message.
   */
  get(name: string, data?: Record<string, any>): string;
}
/**
 * Global validation message registry.
 */
export declare const messages: GlobalMessages;
/**
 * Rule helpers for easy validation.
 * These can all be used directly in a model's validation configuration.
 *
 * @example
 *
 * import {ascii, length} from 'vue-mc/validation'
 *
 * class User extends Model {
 *     validation() {
 *         return {
 *             password: ascii.and(length(6)),
 *         }
 *     }
 * }
 */
/**
 * Creates a new validation rule.
 *
 * Rules returned by this function can be chained with `or` and `and`.
 * For example: `ruleA.or(ruleB.and(RuleC)).and(RuleD)`
 *
 * The error message can be set or replaced using `format(message|template)`.
 *
 * @param {Object} config:
 *     - name: Name of the error message.
 *     - data: Context for the error message.
 *     - test: Function accepting (value, model), which should
 *             return `true` if the value is valid.
 *
 * @returns {Function} Validation rule.
 */
export declare const rule: RuleFunction;
/**
 * AVAILABLE RULES
 */
/**
 * Checks if the value is after a given date string or `Date` object.
 */
export declare const after: (date: Date) => Rule;
/**
 * Checks if a value only has letters.
 */
export declare const alpha: Rule;
/**
 * Checks if a value only has letters or numbers.
 */
export declare const alphanumeric: Rule;
/**
 * Checks if a value is an array.
 */
export declare const array: Rule;
/**
 * Checks if a value is a string consisting only of ASCII characters.
 */
export declare const ascii: Rule;
/**
 * Checks if a value is a valid Base64 string.
 */
export declare const base64: Rule;
/**
 * Checks if a value is before a given date string or `Date` object.
 */
export declare const before: (date: Date) => Rule;
/**
 * Checks if a value is between a given minimum or maximum, inclusive by default.
 */
export declare const between: RuleFunction;
/**
 * Checks if a value is a boolean (strictly true or false).
 */
export declare const boolean: Rule;
/**
 * Checks if a value is a valid credit card number.
 */
export declare const creditcard: Rule;
/**
 * Checks if a value is parseable as a date.
 */
export declare const date: Rule;
/**
 * Checks if a value matches the given date format.
 *
 * @see https://date-fns.org/v2.0.0-alpha.9/docs/format
 */
export declare const dateformat: RuleFunction;
/**
 * Checks if a value is not `undefined`
 */
export declare const defined: Rule;
/**
 * Checks if a value is a valid email address.
 */
export declare const email: Rule;
/**
 * Checks if value is considered empty.
 *
 * @see https://lodash.com/docs/#isEmpty
 */
export declare const empty: Rule;
/**
 * Checks if a value equals the given value.
 */
export declare const equals: RuleFunction;
/**
 * Alias for `equals`
 */
export declare const equal: RuleFunction;
/**
 * Checks if a value is greater than a given minimum.
 */
export declare const gt: RuleFunction;
/**
 * Checks if a value is greater than or equal to a given minimum.
 */
export declare const gte: RuleFunction;
/**
 * Checks if a value is an integer.
 */
export declare const integer: Rule;
/**
 * Checks if a value is a valid IP address.
 */
export declare const ip: Rule;
/**
 * Checks if a value is a zero-length string.
 */
export declare const isblank: Rule;
/**
 * Checks if a value is `null` or `undefined`.
 */
export declare const isnil: Rule;
/**
 * Checks if a value is `null`.
 */
export declare const isnull: Rule;
/**
 * Checks if a value is a valid ISO8601 date string.
 */
export declare const iso8601: Rule;
/**
 * Checks if a value is valid JSON.
 */
export declare const json: Rule;
/**
 * Checks if a value's length is at least a given minimum, and no more than an
 * optional maximum.
 *
 * @see https://lodash.com/docs/#toLength
 */
export declare const length: RuleFunction;
/**
 * Checks if a value is less than a given maximum.
 */
export declare const lt: RuleFunction;
/**
 * Checks if a value is less than or equal to a given maximum.
 */
export declare const lte: RuleFunction;
/**
 * Checks if a value matches a given regular expression string or RegExp.
 */
export declare const match: RuleFunction;
/**
 * Alias for `lte`.
 */
export declare const max: RuleFunction;
/**
 * Alias for `gte`.
 */
export declare const min: RuleFunction;
/**
 * Checks if a value is negative.
 */
export declare const negative: Rule;
/**
 *
 */
export declare const not: RuleFunction;
/**
 * Checks if a value is a number (integer or float), excluding `NaN`.
 */
export declare const number: Rule;
/**
 * Checks if a value is a number or numeric string, excluding `NaN`.
 */
export declare const numeric: Rule;
/**
 * Checks if a value is an object, excluding arrays and functions.
 */
export declare const object: Rule;
/**
 * Checks if a value is positive.
 */
export declare const positive: Rule;
/**
 * Checks if a value is present, ie. not `null`, `undefined`, or a blank string.
 */
export declare const required: Rule;
/**
 * Checks if a value equals another attribute's value.
 */
export declare const same: RuleFunction;
/**
 * Checks if a value is a string.
 */
export declare const string: Rule;
/**
 * Checks if a value is a valid URL string.
 */
export declare const url: Rule;
/**
 * Checks if a value is a valid UUID.
 */
export declare const uuid: Rule;
declare global {
  interface Window {
    __vuemc_validation_messages: GlobalMessages;
  }
  namespace NodeJS {
    interface Global {
      __vuemc_validation_messages: GlobalMessages;
    }
  }
}
export interface Rule {
  (value: any, attribute?: string, model?: Model): true | string;
  _and: Rule[];
  _or: Rule[];
  _format: string | _.TemplateExecutor | null;
  copy(): Rule;
  format(format: string | _.TemplateExecutor): Rule;
  and(rule: Rule | Rule[]): Rule;
  or(rule: Rule | Rule[]): Rule;
}
declare type RuleFunction = (...params: any[]) => Rule;
export {};
