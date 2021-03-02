import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import {
  CartData,
  CartComponentItemsData,
  CartComponentAddData,
  CartComponentRemoveData
} from "../types/Cart";
import { Response, Result } from "vue-mc";

export default class Cart extends Model {
  options() {
    return {
      methods: {
        data: "GET",
        get: "GET",
        payment_method_list: "GET",
        add: "POST",
        update: "POST",
        remove: "POST"
      }
    };
  }

  routes() {
    return {
      data: "cart.data",
      get: "cart.get",
      payment_method_list: "cart.payment_method_list",
      add: "cart.add",
      update: "cart.update",
      remove: "cart.remove"
    };
  }

  /**
   * @description Get cart data
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<Response<Result<CartData>>>}
   * @memberof Cart
   */
  async getData(): Promise<Response<Result<CartData>>> {
    return await this.createCustomRequest("data");
  }

  /**
   * @description Add offers to cart
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {CartComponentAddData} obData
   * @return {*}  {Promise<Response<Result<CartData>>>}
   * @memberof Cart
   */
  async add(obData: CartComponentAddData): Promise<Response<Result<CartData>>> {
    return await this.createCustomRequest("add", obData);
  }

  /**
   * @description Updates quantity of offers in cart
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {CartComponentAddData} obData
   * @return {*}  {Promise<Response<Result<CartData>>>}
   * @memberof Cart
   */
  async update(
    obData: CartComponentAddData
  ): Promise<Response<Result<CartData>>> {
    return await this.createCustomRequest("add", obData);
  }

  /**
   * @description Removes positions from cart by offer ID or cart position ID
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {CartComponentRemoveData} obData
   * @return {*}  {Promise<Response<Result<CartData>>>}
   * @memberof Cart
   */
  async remove(
    obData: CartComponentRemoveData
  ): Promise<Response<Result<CartData>>> {
    return await this.createCustomRequest("add", obData);
  }

  /**
   * @description Get cart items
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<Response<CartComponentItemsData>>}
   * @memberof Cart
   */
  async getItems(): Promise<Response<Result<CartComponentItemsData>>> {
    return await this.createCustomRequest("get");
  }
}
