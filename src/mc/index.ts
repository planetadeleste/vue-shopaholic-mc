/**
 * Base Models and Collections.
 * Prepared to be used with PlanetaDelEste.ApiShopaholic OctoberCMS plugin
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 */

import Collection from "./Collection";
import Model from "./Model";
import Base from "./Base";
import File from "./File";
import { toString, trim, isNil } from "lodash";

export { Base, Collection, Model, File };

/**
 * Convert value to string and trim
 * @param {string} [sVal]
 */
export const cleanStr = (sVal?: string): string | null => {
  if (isNil(sVal)) {
    return null;
  }
  return trim(toString(sVal));
};
