import { Order } from "./Order";
import { User } from "./User";

export interface UserAddress {
  id: string;
  isPrimaryAddress: boolean;
  country: string;
  province: string;
  city: string;
  district: string;
  village: string;
  fullAddress: string;
  createdAt: Date;
  updatedAt: Date;

  orders: Order[];
  user: User;
}
