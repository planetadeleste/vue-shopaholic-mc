import { Collection } from "@bit/planetadeleste.shopaholic-mc.base";
import Article from "../models/Article";

export default class Articles extends Collection<Article> {
  model() {
    return Article;
  }

  routes() {
    return {
      fetch: "blog.articles.index"
    };
  }
}
