import { Model, cleanStr } from "@bit/planetadeleste.shopaholic-mc.base";
import { toNumber } from "lodash";
import { required, string } from "vue-mc/validation";
import { GroupData } from "../types/Group";

class Group extends Model {
  defaults(): Record<string, any> {
    return {
      id: null,
      name: null,
      code: null,
      description: null,
    };
  }

  mutations(): Record<string, any> {
    return {
      id: (id: string) => toNumber(id) || null,
      name: [cleanStr],
      code: [cleanStr],
    };
  }

  validation(): Record<string, any> {
    return {
      name: required.and(string),
    };
  }

  routes(): Record<string, any> {
    return {
      fetch: "groups.show",
      create: "groups.store",
      update: "groups.update",
      delete: "groups.destroy",
    };
  }
}

interface Group extends Model, GroupData {}

export default Group;
