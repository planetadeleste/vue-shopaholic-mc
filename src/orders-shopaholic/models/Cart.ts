import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import {
  CartData,
  CartComponentItemsData,
  CartComponentAddData,
  CartComponentRemoveData,
} from "../types/Cart";
import { Response } from "vue-mc";

type ResponseResult<T> = Response<T>;

export default class Cart extends Model {
  options(): Record<string, any> {
    return {
      methods: {
        data: "GET",
        get: "GET",
        payment_method_list: "GET",
        add: "POST",
        update: "POST",
        remove: "POST",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      data: "cart.data",
      get: "cart.get",
      payment_method_list: "cart.payment_method_list",
      add: "cart.add",
      update: "cart.update",
      remove: "cart.remove",
    };
  }

  /**
   * @description Get cart data
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<ResponseResult<CartData>>}
   * @memberof Cart
   */
  async getData(): Promise<ResponseResult<CartData>> {
    return await this.createCustomRequest("data");
  }

  /**
   * @description Add offers to cart
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {CartComponentAddData} obData
   * @param {Boolean} bReturnData
   * @return {*}  {GetCartResponseType<T>}
   * @memberof Cart
   */
  async add(
    obData: CartComponentAddData
  ): Promise<ResponseResult<CartComponentItemsData>>;

  async add(
    obData: CartComponentAddData,
    bReturnData: true
  ): Promise<ResponseResult<CartData>>;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async add(obData: CartComponentAddData, bReturnData?: boolean) {
    const obParams = bReturnData ? { return_data: true } : undefined;
    return await this.createCustomRequest("add", obData, obParams);
  }

  /**
   * @description Updates quantity of offers in cart
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {CartComponentAddData} obData
   * @param {Boolean} bReturnData
   * @return {*}  {GetCartResponseType<T>}
   * @memberof Cart
   */
  async update(
    obData: CartComponentAddData
  ): Promise<ResponseResult<CartComponentItemsData>>;

  async update(
    obData: CartComponentAddData,
    bReturnData: true
  ): Promise<ResponseResult<CartData>>;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async update(obData: CartComponentAddData, bReturnData?: boolean) {
    const obParams = bReturnData ? { return_data: true } : undefined;
    return await this.createCustomRequest("update", obData, obParams);
  }

  /**
   * @description Removes positions from cart by offer ID or cart position ID
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {CartComponentRemoveData} obData
   * @param {Boolean} bReturnData
   * @return {*}  {GetCartResponseType<T>}
   * @memberof Cart
   */
  async remove(
    obData: CartComponentRemoveData
  ): Promise<ResponseResult<CartComponentItemsData>>;

  async remove(
    obData: CartComponentRemoveData,
    bReturnData: true
  ): Promise<ResponseResult<CartData>>;

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async remove(obData: CartComponentRemoveData, bReturnData?: boolean) {
    const obParams = bReturnData ? { return_data: true } : undefined;
    return await this.createCustomRequest("remove", obData, obParams);
  }

  /**
   * @description Get cart items
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<ResponseResults<CartComponentItemsData>>}
   * @memberof Cart
   */
  async getItems(): Promise<ResponseResult<CartComponentItemsData>> {
    return await this.createCustomRequest("get");
  }
}
