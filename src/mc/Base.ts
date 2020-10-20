import { RouteResolver } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/Structures/Base";
import { VuexModule } from "vuex-module-decorators";
import _ from "lodash";

export default class Base {
  static $resolve: RouteResolver;
  static $flashModule: VuexModule;
  static $loadingModule: VuexModule;
  static $authModule: VuexModule;

  get flashModule() {
    return Base.$flashModule;
  }

  get loadingModule() {
    return Base.$loadingModule;
  }

  get authModule() {
    return Base.$authModule;
  }

  getRouteResolver() {
    return Base.$resolve;
  }

  alert(sMessage: string, sType = "error"): string {
    if (!this.flashModule) {
      return sMessage;
    }

    _.invoke(this.flashModule, sType, sMessage);
    return sMessage;
  }
}
