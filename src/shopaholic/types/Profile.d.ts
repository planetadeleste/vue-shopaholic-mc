import { UserAddressData } from "./UserAddress";

export interface ProfileData {
  id: number;
  groups: string[];
  email: string;
  name: string;
  last_name: string;
  middle_name: string;
  phone: string;
  phone_list: string[];
  avatar: string;
  property: Record<string, any>;
  address: UserAddressData;
  role: string;
}
