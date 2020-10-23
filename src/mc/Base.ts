import { RouteResolver } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/Structures/Base";
import { VuexModule } from "vuex-module-decorators";
import { AxiosStatic } from "axios";

export default class Base {
  static $resolve: RouteResolver;
  static $flashModule: VuexModule;
  static $loadingModule: VuexModule;
  static $authModule: VuexModule;
  static $http: AxiosStatic;

  get flashModule() {
    return Base.$flashModule;
  }

  get loadingModule() {
    return Base.$loadingModule;
  }

  get authModule() {
    return Base.$authModule;
  }
}
