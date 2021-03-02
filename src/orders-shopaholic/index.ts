/**
 * Models and Collections for OrdersShopaholic plugin
 *
 * @author Alvaro Canepa <bfpdevel@gmail.com>
 */

// COLLECTIONS
import Orders from "./collections/Orders";
import PaymentMethods from "./collections/PaymentMethods";
import Statuses from "./collections/Statuses";

export { Orders, PaymentMethods, Statuses };

// MODELS
import Cart from "./models/Cart";
import Order from "./models/Order";
import PaymentMethod from "./models/PaymentMethod";
import Status from "./models/Status";

export { Cart, Order, PaymentMethod, Status };
