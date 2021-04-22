import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { Response } from "vue-mc";
import _ from "lodash";
import { required, string, email } from "vue-mc/validation";
import {
  ProfileData,
  UserRegisterOptions,
  ResponseLoginRegisterData,
  ResponseProfileAvatarData,
} from "../types/Profile";
import {
  UserAddressData,
  UserAddressUpdateResponse,
} from "../types/UserAddress";

type RecordProfileData = UserRegisterOptions & Record<string, any>;

class Profile extends Model {
  defaults() {
    return {
      id: null,
      groups: [],
      email: null,
      name: null,
      last_name: null,
      middle_name: null,
      phone: null,
      phone_list: null,
      avatar: null,
      property: [],
      address: null,
      role: null,
      created_at: null,
      updated_at: null,
    };
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [cleanStr],
      email: [cleanStr],
    };
  }

  accessors() {
    return {
      fullName: () => {
        return _.chain([this.name, this.middle_name, this.last_name])
          .compact()
          .join(" ")
          .value();
      },
    };
  }

  validation() {
    return {
      name: required.and(string),
      email: required.and(email),
    };
  }

  options() {
    return {
      methods: {
        avatar: "GET",
        login: "POST",
        logout: "POST",
        register: "POST",

        address: "GET",
        addAddress: "POST",
        updateAddress: "POST",
        removeAddress: "POST",
      },
    };
  }

  routes() {
    return {
      fetch: "profile.show",
      create: "profile.store",
      update: "profile.update",
      delete: "profile.destroy",
      avatar: "profile.avatar",

      address: "profile.address",
      addAddress: "profile.address.add",
      updateAddress: "profile.address.update",
      removeAddress: "profile.address.remove",

      login: "auth.login",
      logout: "auth.invalidate",
      register: "auth.register",
    };
  }

  /**
   * @description Get current user avatar path
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<Response>}
   * @memberof Profile
   */
  async loadAvatar(): Promise<Response<ResponseProfileAvatarData>> {
    return await this.createCustomRequest("avatar", []);
  }

  /**
   * @description Load current user addresses
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @return {*}  {Promise<Response<UserAddressData[]>>}
   * @memberof Profile
   */
  async loadAddress(): Promise<Response<UserAddressData[]>> {
    return await this.createCustomRequest("address", []);
  }

  /**
   * @description Create a new address on current user
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {UserAddressData} obAddress
   * @return {*}  {Promise<Response<UserAddressUpdateResponse>>}
   * @memberof Profile
   */
  async addAddress(
    obAddress: UserAddressData
  ): Promise<Response<UserAddressUpdateResponse>> {
    return await this.createCustomRequest("addAddress", obAddress);
  }

  /**
   * @description Update address data from current user
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {UserAddressData} obAddress
   * @return {*}  {Promise<Response>}
   * @memberof Profile
   */
  async updateAddress(obAddress: UserAddressData): Promise<Response> {
    return await this.createCustomRequest("updateAddress", obAddress);
  }

  /**
   * @description Remove address from current user
   * @author Alvaro Canepa <bfpdevel@gmail.com>
   * @param {number} iAddressId
   * @return {*}  {Promise<Response>}
   * @memberof Profile
   */
  async removeAddress(iAddressId: number): Promise<Response> {
    return await this.createCustomRequest("removeAddress", { id: iAddressId });
  }

  async login(
    login: string,
    password: string
  ): Promise<Response<ResponseLoginRegisterData>> {
    const data = { email: login, password: password };

    return await this.createCustomRequest("login", data);
  }

  async register(
    obData: RecordProfileData
  ): Promise<Response<ResponseLoginRegisterData>> {
    return await this.createCustomRequest("register", obData);
  }

  async logout() {
    const sToken = localStorage.getItem("access_token");
    if (!sToken) {
      return Promise.reject("token_not_provided");
    }

    const data = { token: sToken };

    return await this.createCustomRequest("logout", data);
  }
}

interface Profile extends Model, ProfileData {}

export default Profile;
