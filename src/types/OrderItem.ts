import { Cat } from "./Cat";
import { Order } from "./Order";
import { ShippingService } from "./ShippingService";

export type OrderItemStatus =
  | "PENDING"
  | "PACKAGING"
  | "SHIPPED"
  | "DELIVERED"
  | "RECEIVED";

export interface OrderItem {
  id: string;
  status: OrderItemStatus;
  amount: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  cat: Cat;
  shippingService: ShippingService;
  order: Order;
}
