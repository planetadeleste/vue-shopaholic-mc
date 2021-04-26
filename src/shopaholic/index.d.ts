import { AuthData } from "./types/Auth";
import { BrandData } from "./types/Brand";
import { CategoryData } from "./types/Category";
import { GroupData } from "./types/Group";
import { OfferData } from "./types/Offer";
import { ProductData } from "./types/Product";
import { ProfileData } from "./types/Profile";
import { UserData } from "./types/User";
import { UserAddressData } from "./types/UserAddress";

declare module "@bit/planetadeleste.shopaholic-mc.shopaholic/types" {
  export {
    AuthData,
    BrandData,
    CategoryData,
    GroupData,
    OfferData,
    ProductData,
    ProfileData,
    UserData,
    UserAddressData,
  };
}
