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

  import Response from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  import ProxyResponse from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  import ResponseError from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  import Request from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  import RequestError from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";
  import ValidationError from "@bit/planetadeleste.shopaholic-mc.types.vue-mc";

  export default Response;
  export default ResponseError;
  export default Request;
  export default RequestError;
  export default ProxyResponse;
  export default ValidationError;

  export * from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/HTTP/BaseResponse";
  export * from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/Validation/locale";
}

declare module "vue-mc/validation" {
  export * from "@bit/planetadeleste.shopaholic-mc.types.vue-mc/Validation";
}
