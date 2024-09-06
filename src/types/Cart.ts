import { CartItem } from "./CartItem";
import { User } from "./User";

export interface Cart {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  user: User;
  cartItems: CartItem[];
}
