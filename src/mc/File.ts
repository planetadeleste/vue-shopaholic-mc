import { Model } from ".";
import { Response } from "vue-mc";
import { FileData } from "./types/File";

/**
 * @description File model
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 * @export
 * @class File
 * @extends {Model}
 *
 * @property {string} disk_name
 * @property {string} thumb
 * @property {string} path
 * @property {string} file_name
 * @property {string} ext
 * @property {string} title
 * @property {string} description
 */
class File extends Model {
  defaults() {
    return {
      disk_name: null,
      thumb: null,
      path: null,
      file_name: null,
      ext: null,
      title: null,
      description: null
    };
  }

  options() {
    return {
      methods: {
        resize: "GET"
      }
    };
  }

  routes() {
    return {
      resize: "files.resize"
    };
  }

  /**
   * @description Resize current file
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {number} width Target width. If is 0, that value is calculated using original image ratio
   * @param {number} height Target height. If is 0, that value is calculated using original image ratio
   * @return {Promise<Response>}
   * @memberof File
   */
  async resize(width: number, height: number): Promise<Response> {
    return await this.createCustomRequest(
      "resize",
      { width, height, disk_name: this.disk_name },
      ["disk_name"]
    );
  }
}

interface File extends Model, FileData {}

export default File;
