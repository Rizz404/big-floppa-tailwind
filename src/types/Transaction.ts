import { Order } from "./Order";
import { PaymentMethod } from "./PaymentMethod";
import { User } from "./User";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface Transaction {
  id: string;
  adminFee: number;
  paymentMethodFee: number;
  shippingServiceFee: number;
  status: PaymentStatus;
  subTotal: number;
  total: number;
  transactionDate: Date;
  createdAt: Date;
  updatedAt: Date;

  buyer: User;
  seller: User;
  paymentMethod: PaymentMethod;
  orders: Order;
}
