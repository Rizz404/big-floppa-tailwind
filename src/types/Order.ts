import { OrderItem } from "./OrderItem";
import { Transaction } from "./Transaction";
import { User } from "./User";
import { UserAddress } from "./UserAddress";

export interface Order {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  transaction: Transaction;
  userAddress: UserAddress;
  orderItems: OrderItem[];
}
