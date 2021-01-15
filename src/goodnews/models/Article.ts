import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { integer, min, string, required } from "vue-mc/validation";
import { OCFileData } from "@bit/planetadeleste.shopaholic.types.base";
import { toNumber } from "lodash";
import MarkdownIt from "markdown-it";

export default class Article extends Model {
  id!: number;
  category_id!: number;
  title!: string;
  slug!: string;
  content!: string;
  preview_text!: string;
  preview_image!: string;
  images!: OCFileData[];
  published_start!: string;
  published_stop!: string;
  view_count!: string;

  defaults() {
    return {
      id: null,
      category_id: null,
      title: "",
      slug: "",
      content: "",
      preview_text: null,
      preview_image: null,
      images: [],
      published_start: null,
      published_stop: null,
      view_count: null
    };
  }

  mutations() {
    return {
      id: (id: string) => toNumber(id) || null,
      category_id: (id: string) => Number(id) || null,
      title: (sValue: string) => new MarkdownIt().renderInline(sValue) || null,
      slug: [cleanStr],
      content: [cleanStr],
      preview_text: [cleanStr],
      preview_image: [cleanStr],
      published_start: [cleanStr],
      published_stop: [cleanStr]
    };
  }

  validation() {
    return {
      category_id: required.and(integer).and(min(1)),
      title: required.and(string)
    };
  }

  routes() {
    return {
      fetch: "blog.articles.show",
      create: "blog.articles.store",
      update: "blog.articles.update",
      delete: "blog.articles.destroy"
    };
  }
}
