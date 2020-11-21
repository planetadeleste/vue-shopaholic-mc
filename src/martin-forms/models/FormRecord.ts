import { Model } from "@bit/planetadeleste.shopaholic-mc.base";
import { required, email } from "vue-mc/validation";

export default class FormRecord extends Model {
  name!: string;
  email!: string;
  phone!: string;
  message!: string;

  defaults() {
    return {
      name: "",
      email: "",
      message: "",
      phone: ""
    };
  }

  validation() {
    return {
      email: required.and(email)
    };
  }

  options() {
    return {
      methods: {
        send: "POST"
      }
    };
  }

  routes() {
    return {
      send: "forms.records.send"
    };
  }

  send() {
    const method = this.getOption("methods.send");
    const route = this.getRoute("send");
    const params = this.getRouteParameters();
    const url = this.getURL(route, params);
    const data = this.getSaveData();

    return this.createRequest({ method, url, data }).send();
  }
}
