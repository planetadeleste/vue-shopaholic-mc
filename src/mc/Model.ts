import { Model as BaseModel } from "vue-mc";
import { applyMixinsAsSubclass } from "@qiwi/mixin";
import Base from "./Base";

export default class Model extends applyMixinsAsSubclass(BaseModel, Base) {}
