/**
 * Models and Collections for Lovata.Shopaholic plugin
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 */

// COLLECTIONS
import Categories from "./collections/Categories";
import Products from "./collections/Products";
import Users from "./collections/Users";
import Groups from "./collections/Groups";

export { Categories, Products, Users, Groups };

// MODELS
import Category from "./models/Category";
import Offer from "./models/Offer";
import Product from "./models/Product";
import Profile from "./models/Profile";
import User from "./models/User";
import UserAddress from "./models/UserAddress";
import Group from "./models/Group";

export { Category, Offer, Product, Profile, User, UserAddress, Group };
