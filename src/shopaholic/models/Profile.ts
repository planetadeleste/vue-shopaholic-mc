import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { Response } from "vue-mc";
import _ from "lodash";
import { required, string, email } from "vue-mc/validation";
import UserAddress from "./UserAddress";

export default class Profile extends Model {
  id!: number;
  groups!: string[];
  email!: string;
  name!: string;
  last_name?: string | undefined;
  middle_name?: string | undefined;
  phone?: string | undefined;
  phone_list?: string[] | undefined;
  socialite_token?: string[] | undefined;
  avatar?: string | undefined;
  property?: any[] | undefined;
  address?: UserAddress[];
  role?: string;

  defaults() {
    return {};
  }

  mutations() {
    return {
      id: (id: string) => _.toNumber(id) || null,
      name: [_.toString, _.trim],
      email: [_.toString, _.trim],
      fullName: () => {
        return _.chain([this.name, this.middle_name, this.last_name])
          .compact()
          .join(" ")
          .value();
      }
    };
  }

  validation() {
    return {
      name: required.and(string),
      email: required.and(email)
    };
  }

  options() {
    return {
      methods: {
        avatar: "GET",
        login: "POST",
        logout: "POST"
      }
    };
  }

  routes() {
    return {
      fetch: "profile.show",
      create: "profile.store",
      update: "profile.update",
      delete: "profile.destroy",
      avatar: "profile.avatar",
      login: "auth.login",
      logout: "auth.invalidate"
    };
  }

  async loadAvatar(): Promise<Response> {
    const method = this.getOption("methods.avatar");
    const route = this.getRoute("avatar");
    const params = this.getRouteParameters();
    const url = this.getURL(route, params);
    const data = {};

    return await this.createRequest({ method, url, data }).send();
  }

  async login(login: string, password: string) {
    const method = this.getOption("methods.login");
    const route = this.getRoute("login");
    const params = this.getRouteParameters();
    const url = this.getURL(route, params);
    const data = { email: login, password: password };

    return await this.createRequest({ method, url, data }).send();
  }

  async logout() {
    const sToken = localStorage.getItem("access_token");
    if (!sToken) {
      return Promise.reject("token_not_provided");
    }

    const method = this.getOption("methods.logout");
    const route = this.getRoute("logout");
    const params = this.getRouteParameters();
    const url = this.getURL(route, params);
    const data = { token: sToken };

    return await this.createRequest({ method, url, data }).send();
  }
}
