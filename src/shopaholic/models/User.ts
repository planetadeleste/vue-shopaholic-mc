import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber, chain } from "lodash";
import { required, string, email } from "vue-mc/validation";
import { UserData } from "../types/User";

class User extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      is_activated: false,
      name: null,
      email: null,
      groups: [],
      last_name: null,
      middle_name: null,
      phone: null,
      phone_list: null,
      avatar: null,
      property: [],
      address: null,
      password: null,
      password_confirmation: null,
      created_at: null,
      updated_at: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      email: [cleanStr],
    };
  }

  accessors(): Record<string, any> {
    return {
      fullName: () => {
        return chain([this.name, this.middle_name, this.last_name])
          .compact()
          .join(" ")
          .value();
      },
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
      email: required.and(email),
    };
  }

  options(): Record<string, any> {
    return {
      methods: {
        stats: "GET",
      },
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "users.show",
      create: "users.store",
      update: "users.update",
      delete: "users.destroy",
      stats: "users.stats",
    };
  }

  async stats() {
    return await this.createCustomRequest("stats");
  }
}

interface User extends Model, UserData {}

export default User;
