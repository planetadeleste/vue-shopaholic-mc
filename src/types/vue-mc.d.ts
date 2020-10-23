declare module "vue-mc" {
  import {
    Model,
    Collection
  } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  export { Model, Collection };
  export {
    Mutation,
    AttributesValidationErrors,
    ValidationResultError,
    ValidationResult,
    ValidationTask
  } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  export { Predicate } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";

  import {
    Response,
    Request,
    ResponseError,
    RequestError,
    ProxyResponse,
    ValidationError
  } from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";

  export {
    Response,
    Request,
    ResponseError,
    RequestError,
    ProxyResponse,
    ValidationError
  };

  export * from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/HTTP/BaseResponse";
  export * from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/Validation/locale";
}

declare module "vue-mc/validation" {
  export * from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/Validation";
}
