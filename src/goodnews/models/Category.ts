import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, string } from "vue-mc/validation";
import { toNumber } from "lodash";

/**
 * Lovata.GoodNew Category model
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 * @export
 * @class Category
 * @extends {Model}
 *
 * @property {number} id
 * @property {number} external_id
 * @property {boolean} active
 * @property {string} name
 * @property {string} slug
 * @property {string} code
 * @property {string} content
 * @property {string} preview_text
 * @property {string} description
 * @property {string} created_at
 * @property {string} updated_at
 * @property {string} preview_image
 * @property {Array<OCFileData>} images
 * @property {Array<Category>} children
 */
export default class Category extends Model {
  defaults() {
    return {
      id: null,
      name: null,
      code: null,
      slug: null,
      preview_image: null,
      images: [],
      preview_text: null,
      description: null,
      active: false,
      external_id: null,
      children: []
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      slug: [cleanStr],
      description: [cleanStr],
      preview_text: [cleanStr],
      preview_image: [cleanStr]
    };
  }

  validation() {
    return {
      name: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "blog.categories.show",
      save: "blog.categories.store",
      create: "blog.categories.store",
      update: "blog.categories.update",
      delete: "blog.categories.destroy"
    };
  }
}
