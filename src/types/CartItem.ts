import { Cart } from "./Cart";
import { Cat } from "./Cat";

export interface CartItem {
  id: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  cart: Cart;
  cat: Cat[];
}
